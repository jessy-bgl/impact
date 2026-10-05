import { MD3Theme, useTheme } from "react-native-paper";

import { CategoryStyleKey } from "@carbonFootprint/domain/entities/footprints/categoryIcons";

export type CategoryPalette = Record<CategoryStyleKey, string>;

/*
 * One hue per category. Light fills carry white ink, dark fills black ink.
 * Merchant services reuse food's orange: they never show beside food.
 */

export const lightCategoryPalette: CategoryPalette = {
  transport: "#0A7DB2",
  food: "#C45000",
  housing: "#8A6D00",
  everydayThings: "#9D53B3",
  societalServices: "#038472",
  merchantServices: "#C45000",
};

export const darkCategoryPalette: CategoryPalette = {
  transport: "#5799DC",
  food: "#D07843",
  housing: "#BF9900",
  everydayThings: "#B46BCC",
  societalServices: "#1F9783",
  merchantServices: "#D07843",
};

type CategoryTheme = MD3Theme & {
  colors: MD3Theme["colors"] & { categories: CategoryPalette };
};

/** The category palette of the theme on display. */
export const useCategoryPalette = (): CategoryPalette =>
  useTheme<CategoryTheme>().colors.categories;
