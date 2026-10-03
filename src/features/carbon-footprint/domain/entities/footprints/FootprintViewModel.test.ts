import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import {
  FootprintCategory,
  footprintCategories,
} from "@carbonFootprint/domain/entities/footprints/Footprints";

const partsOf = (footprints: Record<FootprintCategory, number>): number[] =>
  Object.values(
    FootprintCategoryViewModel.forCategories(
      footprints,
      footprintCategories.reduce((total, c) => total + footprints[c], 0),
    ),
  ).map(({ part }) => part);

describe("FootprintCategoryViewModel.forCategories", () => {
  it("distributes the rounded parts so they sum to 100", () => {
    const parts = partsOf({
      transport: 1000,
      food: 1000,
      housing: 1000,
      everydayThings: 0,
      societalServices: 0,
    });

    expect(parts.reduce((sum, part) => sum + part, 0)).toBe(100);
  });

  it("leaves every part at 0 when the total is 0", () => {
    const parts = partsOf({
      transport: 0,
      food: 0,
      housing: 0,
      everydayThings: 0,
      societalServices: 0,
    });

    expect(parts).toEqual(footprintCategories.map(() => 0));
  });
});
