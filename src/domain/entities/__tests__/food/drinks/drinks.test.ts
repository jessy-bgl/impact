import { Drinks } from "@domain/entities/food/drinks/Drinks";
import { drinksDataset } from "./dataset";

describe("Drinks", () => {
  it.each<[number, Drinks]>(
    drinksDataset.map(({ drinks, expectedFootprint }) => [
      expectedFootprint,
      drinks,
    ]),
  )(
    "should give a footprint equal to %d kgCO2e",
    (expectedFootprint, drinks) => {
      expect(drinks.annualFootprint).toBe(expectedFootprint);
    },
  );
});
