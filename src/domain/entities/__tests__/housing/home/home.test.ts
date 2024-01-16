import { Home } from "@domain/entities/housing/home/Home";
import { homeDataset } from "./dataset";

describe("Home", () => {
  describe("annualFootprint", () => {
    it.each<[number, Home]>(
      homeDataset.map(({ home, expectedAnnualFootprint }) => [
        expectedAnnualFootprint,
        home,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, home) => {
        expect(new Home(home).annualFootprint).toEqual(expectedAnnualFootprint);
      },
    );
  });
});
