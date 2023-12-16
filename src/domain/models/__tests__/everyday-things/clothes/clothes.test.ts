import { clothesDataset } from "@domain/models/__tests__/everyday-things/clothes/dataset";
import { Clothes } from "@domain/models/everyday-things/clothes/Clothes";

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
