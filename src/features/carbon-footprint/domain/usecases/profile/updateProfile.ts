import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { isProfileCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import {
  computeProfileSectionVersion,
  profileSections,
} from "@carbonFootprint/domain/entities/profile/profileSections";
import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";
import { ProfileRepository } from "@carbonFootprint/domain/repositories/profile.repository";

export const createUpdateProfile = (
  computeEngine: ComputeEngine,
  profileRepository: ProfileRepository,
  footprintsRepository: FootprintsRepository,
) => {
  const updateTransportProfile = (
    question: Question,
    value: string | number,
  ) => {
    _updateProfile(question, value);
    _recomputeCategoryFootprint("transport");
  };

  const updateFoodProfile = (question: Question, value: string | number) => {
    _updateProfile(question, value);
    _recomputeCategoryFootprint("food");
  };

  const updateHousingProfile = (question: Question, value: string | number) => {
    _updateProfile(question, value);
    _recomputeCategoryFootprint("housing");
  };

  const updateEverydayThingsProfile = (
    question: Question,
    value: string | number,
  ) => {
    _updateProfile(question, value);
    _recomputeCategoryFootprint("everydayThings");
  };

  const _updateProfile = (question: Question, value: string | number): void => {
    if (
      typeof value === "string" &&
      value !== "oui" &&
      value !== "non" &&
      !value.startsWith("'")
    ) {
      value = `'${value}'`;
    }

    if (typeof value === "number" && value === undefined) {
      value = question.minValue || 0;
    }

    // Engine first: a store subscriber rendering in between would otherwise
    // read the engine with the previous answer and keep the result.
    computeEngine.setProfile({
      ...profileRepository.fetchAdemeProfile(),
      [question.label]: value,
    });
    profileRepository.updateProfileKey(question.label, value);
  };

  const validateProfileSection = ({
    category,
    subCategory,
  }: {
    category: FootprintCategory;
    subCategory: FootprintSubCategory;
  }): { profileJustCompleted: boolean } => {
    _saveVisibleDefaultValues(category, subCategory);
    return updateProfileCompletion({ category, subCategory, completed: true });
  };

  const _saveVisibleDefaultValues = (
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
  ) => {
    const section = _findSection(category, subCategory);
    if (!section) return;

    const profile = profileRepository.fetchAdemeProfile();
    const questions = Object.values(
      computeEngine.getQuestions(profile, Object.values(section.questionKeys)),
    );
    // A mosaic is answered through its options, never on its own rule.
    const answerableQuestions = questions.flatMap((question) =>
      question.subQuestions
        ? question.subQuestions.filter((subQuestion) => !subQuestion.isInactive)
        : [question],
    );
    const defaultValues = Object.fromEntries(
      answerableQuestions
        .filter(
          (question) =>
            question.isApplicable &&
            question.isEngineDefaultValueUsed &&
            question.defaultValue,
        )
        .map((question) => [
          question.label,
          question.type === "number"
            ? Number(question.defaultValue)
            : question.defaultValue!,
        ]),
    ) as Partial<Record<keyof Profile, string | number>>;
    if (Object.keys(defaultValues).length === 0) return;

    computeEngine.setProfile({ ...profile, ...defaultValues });
    profileRepository.updateProfileKeys(defaultValues);
    _recomputeCategoryFootprint(category);
  };

  const _recomputeCategoryFootprint = (category: FootprintCategory) => {
    switch (category) {
      case "transport":
        return footprintsRepository.updateTransportFootprint(
          computeEngine.computeTransportFootprint(),
        );
      case "food":
        return footprintsRepository.updateFoodFootprint(
          computeEngine.computeFoodFootprint(),
        );
      case "housing":
        return footprintsRepository.updateHousingFootprint(
          computeEngine.computeHousingFootprint(),
        );
      case "everydayThings":
        return footprintsRepository.updateEverydayThingsFootprint(
          computeEngine.computeEverydayThingsFootprint(),
        );
      case "societalServices":
        return footprintsRepository.updateSocietalServicesFootprint(
          computeEngine.computeSocietalServicesFootprint(),
        );
    }
  };

  const updateProfileCompletion = ({
    category,
    subCategory,
    completed,
  }: {
    category: FootprintCategory;
    subCategory: FootprintSubCategory;
    completed: boolean;
  }): { profileJustCompleted: boolean } => {
    const wasProfileCompleted = isProfileCompleted(
      profileRepository.fetchProfileCompletion(),
    );

    profileRepository.updateProfileCompletion(category, subCategory, completed);
    if (completed) {
      const section = _findSection(category, subCategory);
      if (section) {
        profileRepository.updateProfileCompletionVersion(
          category,
          subCategory,
          computeProfileSectionVersion(section.questionKeys),
        );
      }
    }

    const profileJustCompleted =
      !wasProfileCompleted &&
      isProfileCompleted(profileRepository.fetchProfileCompletion());

    return { profileJustCompleted };
  };

  const _findSection = (
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
  ) =>
    Object.values(profileSections).find(
      (s) => s.category === category && s.subCategory === subCategory,
    );

  return {
    updateTransportProfile,
    updateFoodProfile,
    updateHousingProfile,
    updateEverydayThingsProfile,
    updateProfileCompletion,
    validateProfileSection,
  };
};
