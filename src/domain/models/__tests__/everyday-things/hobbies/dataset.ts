import { Hobbies } from "@domain/models/everyday-things/hobbies/Hobbies";

export const cultureDataset: {
  hobbies: Hobbies;
  expectedCultureAnnualFootprint: number;
}[] = [
  {
    hobbies: new Hobbies({}),
    expectedCultureAnnualFootprint: 0,
  },
  {
    hobbies: new Hobbies({ concertsAndShows: true }),
    expectedCultureAnnualFootprint: 26.5,
  },
  {
    hobbies: new Hobbies({ museumsAndMonuments: true }),
    expectedCultureAnnualFootprint: 1.3,
  },
  {
    hobbies: new Hobbies({ music: true }),
    expectedCultureAnnualFootprint: 3.7,
  },
  {
    hobbies: new Hobbies({ editions: true }),
    expectedCultureAnnualFootprint: 47.9,
  },
];

export const sportDataset: {
  hobbies: Hobbies;
  expectedSportAnnualFootprint: number;
}[] = [
  {
    hobbies: new Hobbies({}),
    expectedSportAnnualFootprint: 0,
  },
  {
    hobbies: new Hobbies({ outdoorIndividualSport: true }),
    expectedSportAnnualFootprint: 27.44,
  },
  {
    hobbies: new Hobbies({
      outdoorIndividualSport: true,
      ballSport: true,
      waterSport: true,
      swimming: true,
      martialSport: true,
      athletics: true,
      riding: true,
      golf: true,
      motorSport: true,
      otherSport: true,
    }),
    expectedSportAnnualFootprint: 97.75,
  },
  {
    hobbies: new Hobbies({
      outdoorIndividualSport: true,
      ballSport: true,
      waterSport: true,
      swimming: true,
      martialSport: true,
      athletics: true,
      riding: true,
      golf: true,
      motorSport: true,
      otherSport: true,
      gym: true,
      winterSport: true,
    }),
    expectedSportAnnualFootprint: 201.39,
  },
];
