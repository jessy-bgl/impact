import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { mapFootprintCategories } from "@carbonFootprint/domain/entities/footprints/Footprints";

describe("categoryOrder", () => {
  it("holds every category once", () => {
    expect([...categoryOrder].sort()).toEqual(
      Object.keys(mapFootprintCategories(() => null)).sort(),
    );
  });
});
