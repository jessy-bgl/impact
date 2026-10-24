import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { ComputeEngineStub } from "@carbonFootprint/domain/entities/engine/ComputeEngine.stub";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import {
  computeProfileSectionVersion,
  profileSections,
} from "@carbonFootprint/domain/entities/profile/profileSections";
import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { QuestionStub } from "@carbonFootprint/domain/entities/question/Question.stub";
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

  it("sets the stored profile, answer included, on the engine", () => {
    profileRepository.profile = { "transport . voiture . voyageurs": 2 };

    updateProfile.updateTransportProfile(
      makeQuestion("transport . voiture . km"),
      15000,
    );

    expect(computeEngine.lastProfile).toEqual(profileRepository.profile);
    expect(computeEngine.lastProfile).toEqual({
      "transport . voiture . voyageurs": 2,
      "transport . voiture . km": 15000,
    });
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

  describe("validateProfileSection", () => {
    const { kmPerYear, carSize, averagePassengers } =
      profileSections.car.questionKeys;

    const validateCar = () =>
      updateProfile.validateProfileSection({
        category: "transport",
        subCategory: "car",
      });

    it("saves the default value of a visible unanswered question", () => {
      computeEngine.questions = {
        [carSize]: new QuestionStub(carSize, {
          type: "select",
          defaultValue: "'moyenne'",
        }),
      };

      validateCar();

      expect(profileRepository.profile).toEqual({ [carSize]: "'moyenne'" });
      expect(computeEngine.lastProfile).toEqual(profileRepository.profile);
    });

    it("saves a numeric default value as a number", () => {
      computeEngine.questions = {
        [kmPerYear]: new QuestionStub(kmPerYear, { defaultValue: "12000.5" }),
      };

      validateCar();

      expect(profileRepository.profile[kmPerYear]).toBe(12000.5);
    });

    it("keeps an answered question as answered", () => {
      profileRepository.profile = { [kmPerYear]: 8000 };
      computeEngine.questions = {
        [kmPerYear]: new QuestionStub(kmPerYear, {
          defaultValue: "8000",
          isEngineDefaultValueUsed: false,
        }),
      };

      validateCar();

      expect(profileRepository.profile).toEqual({ [kmPerYear]: 8000 });
    });

    it("skips hidden questions and questions without a default value", () => {
      computeEngine.questions = {
        [kmPerYear]: new QuestionStub(kmPerYear, {
          defaultValue: "12000",
          isApplicable: false,
        }),
        [averagePassengers]: new QuestionStub(averagePassengers),
      };

      validateCar();

      expect(profileRepository.profile).toEqual({});
    });

    it("saves the active options of a mosaic, not the mosaic itself", () => {
      const { meals } = profileSections.meals.questionKeys;
      const activeOption = `${meals} . végétalien . nombre` as keyof Profile;
      const inactiveOption = `${meals} . poisson 1 . nombre` as keyof Profile;
      computeEngine.questions = {
        [meals]: new QuestionStub(meals, {
          type: "multi-number",
          defaultValue: "14",
          subQuestions: [
            new QuestionStub(activeOption, { defaultValue: "2" }),
            new QuestionStub(inactiveOption, {
              defaultValue: "1",
              isInactive: true,
            }),
          ],
        }),
      };

      updateProfile.validateProfileSection({
        category: "food",
        subCategory: "meals",
      });

      expect(profileRepository.profile).toEqual({ [activeOption]: 2 });
    });

    it("recomputes the footprint of the section's category", () => {
      computeEngine.questions = {
        [kmPerYear]: new QuestionStub(kmPerYear, { defaultValue: "12000" }),
      };

      validateCar();

      expect(footprintsRepository.transport).toBe(
        computeEngine.transportFootprint,
      );
    });

    it("marks the section as completed with its version", () => {
      validateCar();

      expect(profileRepository.completion.transport?.car).toBe(true);
      expect(profileRepository.completionVersions.transport?.car).toBe(
        computeProfileSectionVersion(profileSections.car.questionKeys),
      );
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
