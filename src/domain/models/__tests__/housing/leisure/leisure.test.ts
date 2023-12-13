import { leisureDataset } from "./dataset";
import { Leisure } from "@domain/models/housing/leisure/Leisure";

describe("Leisure", () => {
  describe("poolAnnualFootprint", () => {
    it.each<[number, Leisure]>(
      leisureDataset.map(({ leisure, expectedPoolAnnualFootprint }) => [
        expectedPoolAnnualFootprint,
        leisure,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedPoolAnnualFootprint, home) => {
        expect(new Leisure(home).poolAnnualFootprint).toEqual(
          expectedPoolAnnualFootprint,
        );
      },
    );
  });
});
