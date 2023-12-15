import { electricityDataset, heatingDataset } from "./dataset";
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

  describe("heatingAnnualFootprint", () => {
    it.each<[number, Energy]>(
      heatingDataset.map(({ energy, expectedHeatingAnnualFootprint }) => [
        expectedHeatingAnnualFootprint,
        energy,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedHeatingAnnualFootprint, energy) => {
        expect(new Energy(energy).heatingAnnualFootprint).toEqual(
          expectedHeatingAnnualFootprint,
        );
      },
    );
  });
});
