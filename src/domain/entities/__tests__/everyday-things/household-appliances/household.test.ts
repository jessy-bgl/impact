import { HouseholdAppliances } from "@domain/entities/everyday-things/household-appliances/HouseholdAppliances";
import { HouseholdAppliancesDataset } from "./dataset";

describe("Household appliances", () => {
  describe("annualFootprint", () => {
    it.each<[number, HouseholdAppliances]>(
      HouseholdAppliancesDataset.map(
        ({ householdAppliances, expectedAnnualFootprint }) => [
          expectedAnnualFootprint,
          householdAppliances,
        ],
      ),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, householdAppliances) => {
        expect(
          new HouseholdAppliances(householdAppliances).annualFootprint,
        ).toEqual(expectedAnnualFootprint);
      },
    );
  });
});
