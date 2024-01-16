import { Pets } from "@domain/entities/everyday-things/pets/Pets";
import { petsDataset } from "./dataset";

describe("Pets", () => {
  describe("annualFootprint", () => {
    it.each<[number, Pets]>(
      petsDataset.map(({ pets, expectedAnnualFootprint }) => [
        expectedAnnualFootprint,
        pets,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, pets) => {
        expect(new Pets(pets).annualFootprint).toEqual(expectedAnnualFootprint);
      },
    );
  });
});
