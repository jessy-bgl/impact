import { MD3Theme, useTheme } from "react-native-paper";

import { CategoryStyleKey } from "@carbonFootprint/domain/entities/footprints/categoryIcons";

export type CategoryPalette = Record<CategoryStyleKey, string>;

/*
 * Categorical palette, one hue per category, stepped for each theme.
 *
 * Validated as a set (lightness band, chroma floor, CVD and normal-vision
 * separation, contrast) on the neighbours of `categoryOrder`, the closing
 * pair included. Light fills are deep enough to carry white ink, dark fills
 * light enough to carry black ink, both at 4.5:1 or more: icons and labels on
 * the categories read white in the light theme and black in the dark one.
 *
 * Green stays the brand's and red the errors': no category wears them, which
 * keeps food orange. Housing went indigo so that food is not the only warm
 * hue a white ink turns brown.
 */

export const lightCategoryPalette: CategoryPalette = {
  transport: "#0A7DB2",
  food: "#AC6300",
  housing: "#6766D8",
  everydayThings: "#CD3D84",
  societalServices: "#038472",
  merchantServices: "#9D53B3",
};

export const darkCategoryPalette: CategoryPalette = {
  transport: "#069FE6",
  food: "#E06D00",
  housing: "#7671E5",
  everydayThings: "#DE5E98",
  societalServices: "#038F8F",
  merchantServices: "#B46BCC",
};

type CategoryTheme = MD3Theme & {
  colors: MD3Theme["colors"] & { categories: CategoryPalette };
};

/** The category palette of the theme on display. */
export const useCategoryPalette = (): CategoryPalette =>
  useTheme<CategoryTheme>().colors.categories;
