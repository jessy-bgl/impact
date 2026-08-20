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

export const isProfileCompleted = (completion: ProfileCompletion): boolean =>
  (Object.keys(completableSubCategories) as FootprintCategory[]).every(
    (category) => isCategoryCompleted(completion, category),
  );

export const isProfileStarted = (completion: ProfileCompletion): boolean =>
  Object.values(completion).some((subCategories) =>
    Object.values(subCategories ?? {}).some((completed) => completed === true),
  );

export const isCategoryCompleted = (
  completion: ProfileCompletion,
  category: FootprintCategory,
): boolean =>
  completableSubCategories[category].every(
    (subCategory) => completion[category]?.[subCategory] === true,
  );
