import { Hobbies } from "@domain/models/everyday-things/hobbies/Hobbies";
import { cultureDataset, hobbiesDataset, sportDataset } from "./dataset";

describe("Hobbies", () => {
  describe("cultureAnnualFootprint", () => {
    it.each<[number, Hobbies]>(
      cultureDataset.map(({ hobbies, expectedCultureAnnualFootprint }) => [
        expectedCultureAnnualFootprint,
        hobbies,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedCultureAnnualFootprint, hobbies) => {
        expect(new Hobbies(hobbies).cultureAnnualFootprint).toEqual(
          expectedCultureAnnualFootprint,
        );
      },
    );
  });

  describe("sportAnnualFootprint", () => {
    it.each<[number, Hobbies]>(
      sportDataset.map(({ hobbies, expectedSportAnnualFootprint }) => [
        expectedSportAnnualFootprint,
        hobbies,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedSportAnnualFootprint, hobbies) => {
        expect(new Hobbies(hobbies).sportAnnualFootprint).toEqual(
          expectedSportAnnualFootprint,
        );
      },
    );
  });

  describe("annualFootprint", () => {
    it.each<[number, Hobbies]>(
      hobbiesDataset.map(({ hobbies, expectedAnnualFootprint }) => [
        expectedAnnualFootprint,
        hobbies,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, hobbies) => {
        expect(new Hobbies(hobbies).annualFootprint).toEqual(
          expectedAnnualFootprint,
        );
      },
    );
  });
});
