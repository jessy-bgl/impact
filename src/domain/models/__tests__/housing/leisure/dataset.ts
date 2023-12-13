import { Leisure } from "@domain/models/housing/leisure/Leisure";

export const leisureDataset: {
  leisure: Leisure;
  expectedPoolAnnualFootprint: number;
}[] = [
  {
    leisure: new Leisure({ hasIngroundPool: false }),
    expectedPoolAnnualFootprint: 0,
  },
  {
    leisure: new Leisure({ isAnApartment: true }),
    expectedPoolAnnualFootprint: 0,
  },
  {
    leisure: new Leisure({
      isAnApartment: false,
      hasIngroundPool: true,
      inhabitants: 3,
    }),
    expectedPoolAnnualFootprint: 69,
  },
];
