import { drinksDataset } from "./dataset";
import { Drinks } from "../../../food/drinks/Drinks";

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
