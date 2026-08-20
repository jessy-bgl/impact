import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { FootprintsHistoryStubRepository } from "@carbonFootprint/data/repositories/footprintsHistory.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { createRecordFootprintsSnapshot } from "@carbonFootprint/domain/usecases/history/recordFootprintsSnapshot";
import { ClockStub } from "@common/data/clock.stub";
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
      createRecordFootprintsSnapshot(
        new ClockStub(),
        profileRepository,
        footprintsRepository,
        new FootprintsHistoryStubRepository(),
      ).recordFootprintsSnapshot,
    );
  });

  // Quoting logic is shared across all update methods; testing via updateTransportProfile is sufficient.
  describe("value quoting", () => {
    const key = "transport . voiture . gabarit";

    it.each([
      {
        name: "wraps a plain string with single quotes",
        answer: "berline",
        stored: "'berline'",
      },
      {
        name: "does not double-wrap a string already quoted",
        answer: "'berline'",
        stored: "'berline'",
      },
      { name: "does not wrap 'oui'", answer: "oui", stored: "oui" },
      { name: "does not wrap 'non'", answer: "non", stored: "non" },
      { name: "passes a number as-is", answer: 15000, stored: 15000 },
    ])("$name", ({ answer, stored }) => {
      updateProfile.updateTransportProfile(makeQuestion(key), answer);

      expect(computeEngine.lastProfile).toEqual({ [key]: stored });
      expect(profileRepository.profile[key]).toBe(stored);
    });
  });

  it("adds the answer to the engine situation without dropping the previous ones", () => {
    updateProfile.updateTransportProfile(
      makeQuestion("transport . voiture . km"),
      15000,
    );

    expect(computeEngine.lastKeepCurrentValues).toBe(true);
  });

  // societalServices has no update method — its footprint is determined solely by the engine.
  describe("category update methods", () => {
    it.each([
      [
        "transport",
        "updateTransportProfile",
        "transport . voiture . km",
        10000,
      ],
      ["food", "updateFoodProfile", "alimentation . plats", 3],
      ["housing", "updateHousingProfile", "logement . type", "appartement"],
      [
        "everydayThings",
        "updateEverydayThingsProfile",
        "divers . textile . empreinte précise",
        5,
      ],
    ] as const)(
      "%s: recomputes the footprint via the engine and persists it",
      (category, method, key, answer) => {
        updateProfile[method](makeQuestion(key), answer);

        expect(footprintsRepository[category]).toBe(
          computeEngine[`${category}Footprint`],
        );
      },
    );
  });

  describe("updateProfileCompletion", () => {
    it.each([true, false])(
      "always stores completion with completed=%s",
      (completed) => {
        updateProfile.updateProfileCompletion({
          category: "transport",
          subCategory: "plane",
          completed,
        });

        expect(profileRepository.completion["transport"]?.["plane"]).toBe(
          completed,
        );
      },
    );

    it.each([
      ["transport", "plane"],
      ["food", "meals"],
    ] as const)(
      "saves the version of the %s . %s section when completed",
      (category, section) => {
        updateProfile.updateProfileCompletion({
          category,
          subCategory: section,
          completed: true,
        });

        expect(profileRepository.completionVersions[category]?.[section]).toBe(
          computeProfileSectionVersion(profileSections[section].questionKeys),
        );
      },
    );

    it("does not save a version when completed=false", () => {
      updateProfile.updateProfileCompletion({
        category: "transport",
        subCategory: "plane",
        completed: false,
      });

      expect(
        profileRepository.completionVersions["transport"]?.["plane"],
      ).toBeUndefined();
    });

    it("does not save a version when the section is not in profileSections", () => {
      updateProfile.updateProfileCompletion({
        category: "societalServices",
        subCategory: "publicServices",
        completed: true,
      });

      expect(
        profileRepository.completionVersions["societalServices"]?.[
          "publicServices"
        ],
      ).toBeUndefined();
    });
  });

  describe("profileJustCompleted", () => {
    const allSections = Object.values(profileSections);

    const completeAllSectionsExceptLast = () => {
      allSections.slice(0, -1).forEach(({ category, subCategory }) =>
        updateProfile.updateProfileCompletion({
          category,
          subCategory,
          completed: true,
        }),
      );

      return allSections[allSections.length - 1];
    };

    it("is false while at least one section is left to validate", () => {
      const results = allSections
        .slice(0, -1)
        .map(({ category, subCategory }) =>
          updateProfile.updateProfileCompletion({
            category,
            subCategory,
            completed: true,
          }),
        );

      expect(
        results.every(({ profileJustCompleted }) => !profileJustCompleted),
      ).toBe(true);
    });

    it("is true when validating the very last section", () => {
      const { category, subCategory } = completeAllSectionsExceptLast();

      expect(
        updateProfile.updateProfileCompletion({
          category,
          subCategory,
          completed: true,
        }).profileJustCompleted,
      ).toBe(true);
    });

    it("is false when re-validating a section of an already complete profile", () => {
      const { category, subCategory } = completeAllSectionsExceptLast();
      updateProfile.updateProfileCompletion({
        category,
        subCategory,
        completed: true,
      });

      expect(
        updateProfile.updateProfileCompletion({
          category,
          subCategory,
          completed: true,
        }).profileJustCompleted,
      ).toBe(false);
    });

    it("is true again after a section has been invalidated and re-validated", () => {
      const { category, subCategory } = completeAllSectionsExceptLast();
      updateProfile.updateProfileCompletion({
        category,
        subCategory,
        completed: true,
      });
      updateProfile.updateProfileCompletion({
        category,
        subCategory,
        completed: false,
      });

      expect(
        updateProfile.updateProfileCompletion({
          category,
          subCategory,
          completed: true,
        }).profileJustCompleted,
      ).toBe(true);
    });
  });
});
