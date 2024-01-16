import { clothesDataset } from "@domain/entities/__tests__/everyday-things/clothes/dataset";
import { Clothes } from "@domain/entities/everyday-things/clothes/Clothes";

describe("Clothes", () => {
  describe("annualFootprint", () => {
    it.each<[number, Clothes]>(
      clothesDataset.map(({ clothes, expectedAnnualFootprint }) => [
        expectedAnnualFootprint,
        clothes,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, clothes) => {
        expect(new Clothes(clothes).annualFootprint).toEqual(
          expectedAnnualFootprint,
        );
      },
    );
  });
});
