import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
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
  recordFootprintsSnapshot: () => void,
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

  const _recomputeCategoryFootprint = (category: FootprintCategory) => {
    switch (category) {
      case "transport":
        footprintsRepository.updateTransportFootprint(
          computeEngine.computeTransportFootprint(),
        );
        break;
      case "food":
        footprintsRepository.updateFoodFootprint(
          computeEngine.computeFoodFootprint(),
        );
        break;
      case "housing":
        footprintsRepository.updateHousingFootprint(
          computeEngine.computeHousingFootprint(),
        );
        break;
      case "everydayThings":
        footprintsRepository.updateEverydayThingsFootprint(
          computeEngine.computeEverydayThingsFootprint(),
        );
        break;
      case "societalServices":
        footprintsRepository.updateSocietalServicesFootprint(
          computeEngine.computeSocietalServicesFootprint(),
        );
        break;
    }

    recordFootprintsSnapshot();
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

    const profileJustCompleted =
      !wasProfileCompleted &&
      isProfileCompleted(profileRepository.fetchProfileCompletion());

    // The very first snapshot can only be taken here: validating the last
    // section completes the profile, and no footprint recompute follows it.
    recordFootprintsSnapshot();

    return { profileJustCompleted };
  };

  return {
    updateTransportProfile,
    updateFoodProfile,
    updateHousingProfile,
    updateEverydayThingsProfile,
    updateProfileCompletion,
  };
};
