import { AdemeEngine } from "@domain/entities/AdemeEngine";
import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@domain/entities/footprints/types";
import { Question } from "@domain/entities/question/Question";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";
import { ProfileRepository } from "@domain/repositories/profile.repository";

export const createUpdateProfile = (
  profileRepository: ProfileRepository,
  footprintsRepository: FootprintsRepository,
) => {
  const updateTransportProfile = (
    question: Question,
    value: string | number,
  ) => {
    _updateProfile(question, value);
    const footprint = AdemeFootprintEngine.computeTransportFootprint();
    footprintsRepository.updateTransportFootprint(footprint);
  };

  const updateFoodProfile = (question: Question, value: string | number) => {
    _updateProfile(question, value);
    const footprint = AdemeFootprintEngine.computeFoodFootprint();
    footprintsRepository.updateFoodFootprint(footprint);
  };

  const updateHousingProfile = (question: Question, value: string | number) => {
    _updateProfile(question, value);
    const footprint = AdemeFootprintEngine.computeHousingFootprint();
    footprintsRepository.updateHousingFootprint(footprint);
  };

  const updateEverydayThingsProfile = (
    question: Question,
    value: string | number,
  ) => {
    _updateProfile(question, value);
    const footprint = AdemeFootprintEngine.computeEverydayThingsFootprint();
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

    AdemeEngine.setSituation({ [question.label]: value }, true);

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
