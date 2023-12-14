import { Energy } from "@domain/models/housing/energy/Energy";

export const electricityDataset: {
  energy: Energy;
  expectedElectricityAnnualFootprint: number;
}[] = [
  {
    energy: new Energy({ annualElectricityConsumption: 0 }),
    expectedElectricityAnnualFootprint: 0,
  },
  {
    energy: new Energy({ inhabitants: 2, annualElectricityConsumption: 3000 }),
    expectedElectricityAnnualFootprint: 78,
  },
];
