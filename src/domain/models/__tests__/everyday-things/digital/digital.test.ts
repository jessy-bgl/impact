import { Digital } from "@domain/models/everyday-things/digital/Digital";
import { digitalDataset } from "./dataset";

describe("Digital", () => {
  describe("internetAnnualFootprint", () => {
    it("should give an internet annual footprint equal to 2.92 kgCO2e with 2h of daily use", () => {
      expect(
        new Digital({ internetDailyHours: 2 }).internetAnnualFootprint,
      ).toEqual(2.92);
    });
  });

  describe("annualFootprint", () => {
    it.each<[number, Digital]>(
      digitalDataset.map(({ digital, expectedAnnualFootprint }) => [
        expectedAnnualFootprint,
        digital,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, digital) => {
        expect(new Digital(digital).annualFootprint).toEqual(
          expectedAnnualFootprint,
        );
      },
    );
  });
});
