import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
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
    const footprint = computeEngine.computeTransportFootprint();
    footprintsRepository.updateTransportFootprint(footprint);
  };

  const updateFoodProfile = (question: Question, value: string | number) => {
    _updateProfile(question, value);
    const footprint = computeEngine.computeFoodFootprint();
    footprintsRepository.updateFoodFootprint(footprint);
  };

  const updateHousingProfile = (question: Question, value: string | number) => {
    _updateProfile(question, value);
    const footprint = computeEngine.computeHousingFootprint();
    footprintsRepository.updateHousingFootprint(footprint);
  };

  const updateEverydayThingsProfile = (
    question: Question,
    value: string | number,
  ) => {
    _updateProfile(question, value);
    const footprint = computeEngine.computeEverydayThingsFootprint();
    footprintsRepository.updateEverydayThingsFootprint(footprint);
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
  };

  return {
    updateTransportProfile,
    updateFoodProfile,
    updateHousingProfile,
    updateEverydayThingsProfile,
    updateProfileCompletion,
  };
};
