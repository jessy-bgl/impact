import { Energy } from "@domain/entities/categories/housing/energy/Energy";
import {
  airConditioningDataset,
  electricityDataset,
  heatingDataset,
} from "./dataset";

describe("Energy", () => {
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

  describe("airConditioningAnnualFootprint", () => {
    it.each<[number, Energy]>(
      airConditioningDataset.map(
        ({ energy, expectedAirConditioningAnnualFootprint }) => [
          expectedAirConditioningAnnualFootprint,
          energy,
        ],
      ),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAirConditioningAnnualFootprint, energy) => {
        expect(new Energy(energy).airConditioningAnnualFootprint).toEqual(
          expectedAirConditioningAnnualFootprint,
        );
      },
    );
  });
});
