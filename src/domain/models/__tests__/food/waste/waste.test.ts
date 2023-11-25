import { wasteWithBonusesDataset, wasteWithoutBonusDataset } from "./dataset";
import {
  Waste,
  WasteBonus,
  WasteQuantity,
} from "@domain/models/food/waste/Waste";

describe("Waste", () => {
  describe("Waste without bonus", () => {
    it.each<[number, WasteQuantity]>(
      wasteWithoutBonusDataset.map(({ quantity, expectedFootprint }) => [
        expectedFootprint,
        quantity,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e with %s waste",
      (expectedFootprint, quantity) => {
        const waste = new Waste({ quantity });
        expect(waste.annualFootprint).toEqual(expectedFootprint);
      },
    );
  });

  describe("Waste with bonuses", () => {
    it.each<[number, WasteQuantity, Record<WasteBonus, boolean>]>(
      wasteWithBonusesDataset.map(
        ({ quantity, bonuses, expectedFootprint }) => [
          expectedFootprint,
          quantity,
          bonuses,
        ],
      ),
    )(
      "should give an annual footprint equal to %i kgCO2e with %s waste",
      (expectedFootprint, quantity, bonuses) => {
        const waste = new Waste({ quantity, wasteBonuses: bonuses });
        expect(waste.annualFootprint).toEqual(expectedFootprint);
      },
    );
  });
});
