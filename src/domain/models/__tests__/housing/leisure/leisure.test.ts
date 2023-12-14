import { holidaysDataset, poolDataset } from "./dataset";
import { Leisure } from "@domain/models/housing/leisure/Leisure";

describe("Leisure", () => {
  describe("poolAnnualFootprint", () => {
    it.each<[number, Leisure]>(
      poolDataset.map(({ leisure, expectedPoolAnnualFootprint }) => [
        expectedPoolAnnualFootprint,
        leisure,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedPoolAnnualFootprint, leisure) => {
        expect(new Leisure(leisure).poolAnnualFootprint).toEqual(
          expectedPoolAnnualFootprint,
        );
      },
    );
  });

  describe("holidaysAnnualFootprint", () => {
    it.each<[number, Leisure]>(
      holidaysDataset.map(({ leisure, expectedHolidaysAnnualFootprint }) => [
        expectedHolidaysAnnualFootprint,
        leisure,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedHolidaysAnnualFootprint, leisure) => {
        expect(new Leisure(leisure).holidaysAnnualFootprint).toEqual(
          expectedHolidaysAnnualFootprint,
        );
      },
    );
  });
});
