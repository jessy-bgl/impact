import { Furniture } from "@domain/entities/everyday-things/furniture/Furniture";
import { furnitureDataset } from "./dataset";

describe("Furniture", () => {
  describe("annualFootprint", () => {
    it.each<[number, Furniture]>(
      furnitureDataset.map(({ furniture, expectedAnnualFootprint }) => [
        expectedAnnualFootprint,
        furniture,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, furniture) => {
        expect(new Furniture(furniture).annualFootprint).toEqual(
          expectedAnnualFootprint,
        );
      },
    );
  });
});
