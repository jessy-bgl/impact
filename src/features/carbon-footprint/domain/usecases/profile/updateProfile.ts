import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
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

  /**
   * Mosaic options left undefined are neither "oui" nor "non" for the engine,
   * so `non applicable si "<option> = non"` follow-ups stay wrongly visible and
   * the footprint falls back to the French average. Persist "non" for unchecked
   * options to match the checkbox state; options with an engine default are
   * left alone since the engine already resolves them.
   */
  const initMosaicAnswers = (questions: Question[]) => {
    const profile = profileRepository.fetchAdemeProfile();
    const answers: Profile = {};

    for (const question of questions) {
      if (!question?.isApplicable || question.type !== "multi-select") continue;

      for (const subQuestion of question.subQuestions ?? []) {
        if (subQuestion.isInactive) continue;
        if (subQuestion.defaultValue) continue;
        if (profile[subQuestion.label] !== undefined) continue;
        answers[subQuestion.label] = "non";
      }
    }

    const answeredKeys = Object.keys(answers) as (keyof Profile)[];
    if (answeredKeys.length === 0) return;

    computeEngine.setProfile(answers, true);
    profileRepository.updateProfileKeys(answers);

    const categories = new Set(
      answeredKeys.map((key) => computeEngine.getCategory(key)),
    );
    categories.forEach(_recomputeCategoryFootprint);
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

    computeEngine.setProfile({ [question.label]: value }, true);

    profileRepository.updateProfileKey(question.label, value);
  };

  const updateProfileCompletion = (
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    completed: boolean,
  ) => {
    profileRepository.updateProfileCompletion(category, subCategory, completed);
    if (completed) {
      const section = Object.values(profileSections).find(
        (s) => s.category === category && s.subCategory === subCategory,
      );
      if (section) {
        profileRepository.updateProfileCompletionVersion(
          category,
          subCategory,
          computeProfileSectionVersion(section.questionKeys),
        );
      }
    }
  };

  return {
    initMosaicAnswers,
    updateTransportProfile,
    updateFoodProfile,
    updateHousingProfile,
    updateEverydayThingsProfile,
    updateProfileCompletion,
  };
};
