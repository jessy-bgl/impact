import { HouseholdAppliances } from "@domain/models/everyday-things/household-appliances/HouseholdAppliances";

const fakeHouseholdAppliances: Omit<
  HouseholdAppliances,
  "preservation" | "occupants" | "annualFootprint"
> = {
  fridges: 1,
  miniFridges: 1,
  freezers: 1,
  washingMachines: 1,
  dryers: 1,
  dishWashers: 1,
  hoods: 1,
  ovens: 1,
  microwaves: 1,
  hotPlates: 1,
  kettles: 1,
  coffeeMachines: 1,
  vacuumCleaners: 1,
  kitchenRobots: 1,
  electricLawnMowers: 1,
};

export const HouseholdAppliancesDataset: {
  householdAppliances: HouseholdAppliances;
  expectedAnnualFootprint: number;
}[] = [
  {
    householdAppliances: new HouseholdAppliances({}),
    expectedAnnualFootprint: 0,
  },
  {
    householdAppliances: new HouseholdAppliances({
      ...fakeHouseholdAppliances,
      occupants: 2,
      preservation: "none",
    }),
    expectedAnnualFootprint: 230,
  },
  {
    householdAppliances: new HouseholdAppliances({
      ...fakeHouseholdAppliances,
      occupants: 2,
      preservation: "low",
    }),
    expectedAnnualFootprint: 173,
  },
  {
    householdAppliances: new HouseholdAppliances({
      ...fakeHouseholdAppliances,
      occupants: 2,
      preservation: "medium",
    }),
    expectedAnnualFootprint: 115,
  },
  {
    householdAppliances: new HouseholdAppliances({
      ...fakeHouseholdAppliances,
      occupants: 2,
      preservation: "high",
    }),
    expectedAnnualFootprint: 86,
  },
];
