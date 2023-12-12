import { Home } from "@domain/models/housing/home/Home";

export const homeDataset: {
  home: Home;
  expectedAnnualFootprint: number;
}[] = [
  {
    home: new Home({ ageInYears: 50 }),
    expectedAnnualFootprint: 0,
  },
  //   {
  //     home: new Home({
  //       inhabitants: 2,
  //       isAnApartment: false,
  //       isEcoBuilt: false,
  //       livingSpace: 120,
  //       ageInYears: 30,
  //     }),
  //     expectedAnnualFootprint: 550,
  //   },
];
