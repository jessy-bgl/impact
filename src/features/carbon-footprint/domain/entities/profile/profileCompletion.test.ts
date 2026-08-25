import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/Footprints";
import {
  ProfileCompletion,
  completableSubCategories,
  isCategoryCompleted,
  isProfileCompleted,
  isProfileStarted,
} from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { defaultAppStoreValues } from "@common/store/storeDefaultValues";

const completeEverything = (): ProfileCompletion =>
  (Object.keys(completableSubCategories) as FootprintCategory[]).reduce(
    (completion: ProfileCompletion, category) => ({
      ...completion,
      [category]: completableSubCategories[category].reduce(
        (subCategories, subCategory) => ({
          ...subCategories,
          [subCategory]: true,
        }),
        {},
      ),
    }),
    {},
  );

const categoriesWithSections = (
  Object.keys(completableSubCategories) as FootprintCategory[]
).filter((category) => completableSubCategories[category].length > 0);

describe("profileCompletion", () => {
  describe("isCategoryCompleted", () => {
    it.each(categoriesWithSections)(
      "is false for %s when no answer has been validated",
      (category) => {
        expect(isCategoryCompleted({}, category)).toBe(false);
      },
    );

    it.each(categoriesWithSections)(
      "is false for %s when a single sub-category is left out",
      (category) => {
        const completion = completeEverything();
        const [firstSubCategory] = completableSubCategories[category];

        expect(
          isCategoryCompleted(
            {
              ...completion,
              [category]: {
                ...completion[category],
                [firstSubCategory]: false,
              },
            },
            category,
          ),
        ).toBe(false);
      },
    );

    it.each(categoriesWithSections)(
      "is true for %s when every sub-category is validated",
      (category) => {
        expect(isCategoryCompleted(completeEverything(), category)).toBe(true);
      },
    );

    it("is true for a category with nothing to answer", () => {
      const categoriesWithoutSections = (
        Object.keys(completableSubCategories) as FootprintCategory[]
      ).filter((category) => completableSubCategories[category].length === 0);

      expect(categoriesWithoutSections).toEqual(["societalServices"]);
      categoriesWithoutSections.forEach((category) => {
        expect(isCategoryCompleted({}, category)).toBe(true);
      });
    });
  });

  describe("isProfileCompleted", () => {
    it("is false when nothing has been validated", () => {
      expect(isProfileCompleted({})).toBe(false);
    });

    it("is false while a single sub-category is missing", () => {
      const completion = completeEverything();
      const [category] = categoriesWithSections;
      const [firstSubCategory] = completableSubCategories[category];

      expect(
        isProfileCompleted({
          ...completion,
          [category]: {
            ...completion[category],
            [firstSubCategory]: false,
          },
        }),
      ).toBe(false);
    });

    it("is true when every answerable sub-category is validated", () => {
      expect(isProfileCompleted(completeEverything())).toBe(true);
    });
  });

  describe("isProfileStarted", () => {
    it("is false when nothing has been validated", () => {
      expect(isProfileStarted({})).toBe(false);
    });

    it("is false for an untouched profile", () => {
      expect(isProfileStarted(defaultAppStoreValues.profile.completion)).toBe(
        false,
      );
    });

    it.each(categoriesWithSections)(
      "is true once a sub-category of %s is validated",
      (category) => {
        const [firstSubCategory] = completableSubCategories[category];

        expect(
          isProfileStarted({
            ...defaultAppStoreValues.profile.completion,
            [category]: { [firstSubCategory]: true },
          }),
        ).toBe(true);
      },
    );

    it("is true when everything is validated", () => {
      expect(isProfileStarted(completeEverything())).toBe(true);
    });
  });
});
