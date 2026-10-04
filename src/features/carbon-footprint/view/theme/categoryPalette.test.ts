import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import {
  darkCategoryPalette,
  lightCategoryPalette,
} from "@carbonFootprint/view/theme/categoryPalette";

describe("category palettes", () => {
  it.each([
    ["light", lightCategoryPalette],
    ["dark", darkCategoryPalette],
  ])("give a color to every ordered category in the %s theme", (_, palette) =>
    categoryOrder.forEach((category) =>
      expect(palette[category]).toBeDefined(),
    ),
  );
});
