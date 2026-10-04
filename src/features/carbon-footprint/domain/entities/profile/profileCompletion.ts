import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";

export type ProfileCompletion = Partial<
  Record<FootprintCategory, Partial<Record<FootprintSubCategory, boolean>>>
>;

const groupSubCategoriesByCategory = () => {
  const subCategories: Record<FootprintCategory, FootprintSubCategory[]> = {
    transport: [],
    food: [],
    housing: [],
    everydayThings: [],
    societalServices: [],
  };

  Object.values(profileSections).forEach(({ category, subCategory }) => {
    subCategories[category].push(subCategory);
  });

  return subCategories;
};

// Sub-categories the user actually has to answer. A category without any
// section (societalServices) has nothing to answer, so it is always completed.
export const completableSubCategories = groupSubCategoriesByCategory();

export const isCategoryCompleted = (
  completion: ProfileCompletion,
  category: FootprintCategory,
): boolean =>
  completableSubCategories[category].every(
    (subCategory) => completion[category]?.[subCategory] === true,
  );

/** Share of the answerable sub-categories validated, from 0 to 1. */
export const computeProfileProgress = (
  completion: ProfileCompletion,
): number => {
  const validations = (
    Object.keys(completableSubCategories) as FootprintCategory[]
  ).flatMap((category) =>
    completableSubCategories[category].map(
      (subCategory) => completion[category]?.[subCategory] === true,
    ),
  );

  if (validations.length === 0) return 1;
  return validations.filter(Boolean).length / validations.length;
};

export const isProfileStarted = (completion: ProfileCompletion): boolean =>
  computeProfileProgress(completion) > 0;

export const isProfileCompleted = (completion: ProfileCompletion): boolean =>
  computeProfileProgress(completion) === 1;
