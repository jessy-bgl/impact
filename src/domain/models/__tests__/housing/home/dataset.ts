import { Home } from "@domain/models/housing/home/Home";

export const homeDataset: {
  home: Home;
  expectedAnnualFootprint: number;
}[] = [
  {
    home: new Home({ ageInYears: 50 }),
    expectedAnnualFootprint: 0,
  },
  {
    home: new Home({
      occupants: 2,
      isAnApartment: false,
      isEcoBuilt: false,
      livingSpace: 120,
    }),
    // TODO : check this value, it should be equal to 550
    expectedAnnualFootprint: 510,
  },
  {
    home: new Home({
      occupants: 2,
      isAnApartment: true,
      isEcoBuilt: false,
      livingSpace: 120,
    }),
    // TODO : check this value, it should be equal to 650
    expectedAnnualFootprint: 630,
  },
  {
    home: new Home({
      occupants: 2,
      isAnApartment: true,
      isEcoBuilt: true,
      livingSpace: 120,
    }),
    // TODO : check this value, it should be equal to 180
    expectedAnnualFootprint: 173,
  },
];
