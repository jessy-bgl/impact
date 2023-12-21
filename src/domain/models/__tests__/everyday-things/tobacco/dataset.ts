import { Tobacco } from "@domain/models/everyday-things/tobacco/Tobacco";

export const tobaccoDataset: {
  tobacco: Tobacco;
  expectedAnnualFootprint: number;
}[] = [
  {
    tobacco: new Tobacco({}),
    expectedAnnualFootprint: 0,
  },
  {
    tobacco: new Tobacco({ weeklyConsumption: "none" }),
    expectedAnnualFootprint: 0,
  },
  {
    tobacco: new Tobacco({ weeklyConsumption: "onePackPerMonth" }),
    expectedAnnualFootprint: 4,
  },
  {
    tobacco: new Tobacco({ weeklyConsumption: "onePackPerWeek" }),
    expectedAnnualFootprint: 15,
  },
  {
    tobacco: new Tobacco({ weeklyConsumption: "onePackPerDay" }),
    expectedAnnualFootprint: 102,
  },
];
