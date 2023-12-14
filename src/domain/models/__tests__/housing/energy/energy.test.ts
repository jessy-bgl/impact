import { electricityDataset } from "@domain/models/__tests__/housing/energy/dataset";
import { Energy } from "@domain/models/housing/energy/Energy";

describe("Energy", () => {
  describe("electricityAnnualFootprint", () => {
    it.each<[number, Energy]>(
      electricityDataset.map(
        ({ energy, expectedElectricityAnnualFootprint }) => [
          expectedElectricityAnnualFootprint,
          energy,
        ],
      ),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedElectricityAnnualFootprint, energy) => {
        expect(new Energy(energy).electricityAnnualFootprint).toEqual(
          expectedElectricityAnnualFootprint,
        );
      },
    );
  });
});
