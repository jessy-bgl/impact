import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { ComputeEngineStub } from "@carbonFootprint/domain/entities/engine/ComputeEngine.stub";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import {
  computeProfileSectionVersion,
  profileSections,
} from "@carbonFootprint/domain/entities/profile/profileSections";
import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { createUpdateProfile } from "@carbonFootprint/domain/usecases/profile/updateProfile";

const makeQuestion = (label: keyof Profile): Question =>
  ({ label }) as Question;

const makeMosaicOption = (
  label: keyof Profile,
  { defaultValue = "", isInactive = false } = {},
): Question =>
  ({
    label,
    type: "select-boolean",
    isApplicable: true,
    isInactive,
    defaultValue,
  }) as Question;

const makeMosaicQuestion = (
  label: keyof Profile,
  subQuestions: Question[],
  { isApplicable = true } = {},
): Question =>
  ({
    label,
    type: "multi-select",
    isApplicable,
    isInactive: false,
    subQuestions,
  }) as Question;

describe("createUpdateProfile", () => {
  let computeEngine: ComputeEngineStub;
  let profileRepository: ProfileStubRepository;
  let footprintsRepository: FootprintsStubRepository;
  let updateProfile: ReturnType<typeof createUpdateProfile>;

  beforeEach(() => {
    computeEngine = new ComputeEngineStub();
    profileRepository = new ProfileStubRepository();
    footprintsRepository = new FootprintsStubRepository();

    updateProfile = createUpdateProfile(
      computeEngine,
      profileRepository,
      footprintsRepository,
    );
  });

  // Quoting logic is shared across all update methods; testing via updateTransportProfile is sufficient.
  describe("value quoting", () => {
    const question = makeQuestion("transport . voiture . gabarit");

    it("wraps plain strings with single quotes", () => {
      updateProfile.updateTransportProfile(question, "berline");

      expect(computeEngine.lastProfile).toEqual({
        "transport . voiture . gabarit": "'berline'",
      });
      expect(profileRepository.profile["transport . voiture . gabarit"]).toBe(
        "'berline'",
      );
    });

    it("does not wrap 'oui'", () => {
      updateProfile.updateTransportProfile(question, "oui");

      expect(computeEngine.lastProfile).toEqual({
        "transport . voiture . gabarit": "oui",
      });
    });

    it("does not wrap 'non'", () => {
      updateProfile.updateTransportProfile(question, "non");

      expect(computeEngine.lastProfile).toEqual({
        "transport . voiture . gabarit": "non",
      });
    });

    it("does not double-wrap strings already starting with a single quote", () => {
      updateProfile.updateTransportProfile(question, "'berline'");

      expect(computeEngine.lastProfile).toEqual({
        "transport . voiture . gabarit": "'berline'",
      });
    });

    it("passes number values as-is without transformation", () => {
      updateProfile.updateTransportProfile(question, 15000);

      expect(computeEngine.lastProfile).toEqual({
        "transport . voiture . gabarit": 15000,
      });
      expect(profileRepository.profile["transport . voiture . gabarit"]).toBe(
        15000,
      );
    });
  });

  // societalServices has no update method — its footprint is determined solely by the engine.
  describe("category update methods", () => {
    it.each([
      {
        label: "transport",
        act: () =>
          updateProfile.updateTransportProfile(
            makeQuestion("transport . voiture . km"),
            10000,
          ),
        getStoredFootprint: () => footprintsRepository.transport,
        getExpectedFootprint: () => computeEngine.transportFootprint,
      },
      {
        label: "food",
        act: () =>
          updateProfile.updateFoodProfile(
            makeQuestion("alimentation . plats"),
            3,
          ),
        getStoredFootprint: () => footprintsRepository.food,
        getExpectedFootprint: () => computeEngine.foodFootprint,
      },
      {
        label: "housing",
        act: () =>
          updateProfile.updateHousingProfile(
            makeQuestion("logement . type"),
            "appartement",
          ),
        getStoredFootprint: () => footprintsRepository.housing,
        getExpectedFootprint: () => computeEngine.housingFootprint,
      },
      {
        label: "everydayThings",
        act: () =>
          updateProfile.updateEverydayThingsProfile(
            makeQuestion("divers . textile . empreinte précise"),
            5,
          ),
        getStoredFootprint: () => footprintsRepository.everydayThings,
        getExpectedFootprint: () => computeEngine.everydayThingsFootprint,
      },
    ])(
      "$label: recomputes footprint via engine and persists it",
      ({ act, getStoredFootprint, getExpectedFootprint }) => {
        act();

        expect(getStoredFootprint()).toBe(getExpectedFootprint());
      },
    );
  });

  describe("initMosaicAnswers", () => {
    const publicTransport = () =>
      makeMosaicQuestion("transport . transports commun", [
        makeMosaicOption("transport . transports commun . bus . présent"),
        makeMosaicOption("transport . transports commun . car . présent"),
      ]);

    it("persists 'non' for every unanswered option without an engine default", () => {
      updateProfile.initMosaicAnswers([publicTransport()]);

      expect(
        profileRepository.profile[
          "transport . transports commun . bus . présent"
        ],
      ).toBe("non");
      expect(
        profileRepository.profile[
          "transport . transports commun . car . présent"
        ],
      ).toBe("non");
    });

    it("adds the answers to the engine situation without dropping the previous one", () => {
      updateProfile.initMosaicAnswers([publicTransport()]);

      expect(computeEngine.lastProfile).toEqual({
        "transport . transports commun . bus . présent": "non",
        "transport . transports commun . car . présent": "non",
      });
      expect(computeEngine.lastKeepPreviousValues).toBe(true);
    });

    it("recomputes the footprint of every touched category", () => {
      updateProfile.initMosaicAnswers([
        publicTransport(),
        makeMosaicQuestion("logement . vacances", [
          makeMosaicOption("logement . vacances . hotel . présent"),
        ]),
      ]);

      expect(footprintsRepository.transport).toBe(
        computeEngine.transportFootprint,
      );
      expect(footprintsRepository.housing).toBe(computeEngine.housingFootprint);
      expect(footprintsRepository.food).toBeUndefined();
    });

    it("keeps answers already given by the user", () => {
      profileRepository.setTestProfileKey(
        "transport . transports commun . bus . présent",
        "oui",
      );

      updateProfile.initMosaicAnswers([publicTransport()]);

      expect(
        profileRepository.profile[
          "transport . transports commun . bus . présent"
        ],
      ).toBe("oui");
    });

    it("leaves options carrying an engine default untouched", () => {
      updateProfile.initMosaicAnswers([
        makeMosaicQuestion("logement . construction . travaux de rénovation", [
          makeMosaicOption(
            "logement . construction . rénovation . travaux . rénovation . présent",
            { defaultValue: "oui" },
          ),
        ]),
      ]);

      expect(profileRepository.profile).toEqual({});
      expect(computeEngine.lastProfile).toBeNull();
    });

    it("ignores inactive options", () => {
      updateProfile.initMosaicAnswers([
        makeMosaicQuestion("transport . vacances", [
          makeMosaicOption(
            "transport . vacances . bateau plaisance . propriétaire",
            { isInactive: true },
          ),
        ]),
      ]);

      expect(profileRepository.profile).toEqual({});
    });

    it("ignores non-applicable mosaics and non-mosaic questions", () => {
      updateProfile.initMosaicAnswers([
        makeMosaicQuestion(
          "transport . transports commun",
          [makeMosaicOption("transport . transports commun . bus . présent")],
          { isApplicable: false },
        ),
        makeQuestion("transport . voiture . km"),
      ]);

      expect(profileRepository.profile).toEqual({});
    });

    it("writes nothing when every option is already answered", () => {
      updateProfile.initMosaicAnswers([publicTransport()]);
      computeEngine.lastProfile = null;

      updateProfile.initMosaicAnswers([publicTransport()]);

      expect(computeEngine.lastProfile).toBeNull();
    });
  });

  describe("updateProfileCompletion", () => {
    it.each([true, false])(
      "always stores completion with completed=%s",
      (completed) => {
        updateProfile.updateProfileCompletion("transport", "plane", completed);

        expect(profileRepository.completion["transport"]?.["plane"]).toBe(
          completed,
        );
      },
    );

    it("saves the section version when completed and section is known", () => {
      updateProfile.updateProfileCompletion("transport", "plane", true);

      const expectedVersion = computeProfileSectionVersion(
        profileSections.plane.questionKeys,
      );
      expect(profileRepository.completionVersions["transport"]?.["plane"]).toBe(
        expectedVersion,
      );
    });

    it("saves the correct version for a different section", () => {
      updateProfile.updateProfileCompletion("food", "meals", true);

      const expectedVersion = computeProfileSectionVersion(
        profileSections.meals.questionKeys,
      );
      expect(profileRepository.completionVersions["food"]?.["meals"]).toBe(
        expectedVersion,
      );
    });

    it("does not save a version when completed=false", () => {
      updateProfile.updateProfileCompletion("transport", "plane", false);

      expect(
        profileRepository.completionVersions["transport"]?.["plane"],
      ).toBeUndefined();
    });

    it("does not save a version when the section is not in profileSections", () => {
      updateProfile.updateProfileCompletion(
        "societalServices",
        "publicServices",
        true,
      );

      expect(
        profileRepository.completionVersions["societalServices"]?.[
          "publicServices"
        ],
      ).toBeUndefined();
    });
  });
});
