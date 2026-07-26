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
