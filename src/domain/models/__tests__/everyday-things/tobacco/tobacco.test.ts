import { Tobacco } from "@domain/models/everyday-things/tobacco/Tobacco";
import { tobaccoDataset } from "./dataset";

describe("Tobacco", () => {
  describe("annualFootprint", () => {
    it.each<[number, Tobacco]>(
      tobaccoDataset.map(({ tobacco, expectedAnnualFootprint }) => [
        expectedAnnualFootprint,
        tobacco,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, tobacco) => {
        expect(new Tobacco(tobacco).annualFootprint).toEqual(
          expectedAnnualFootprint,
        );
      },
    );
  });
});
