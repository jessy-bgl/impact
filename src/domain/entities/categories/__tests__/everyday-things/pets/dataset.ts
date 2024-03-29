import { Pets } from "@domain/entities/categories/everyday-things/pets/Pets";

export const petsDataset: {
  pets: Pets;
  expectedAnnualFootprint: number;
}[] = [
  {
    pets: new Pets({}),
    expectedAnnualFootprint: 0,
  },
  {
    pets: new Pets({ occupants: 2, cats: 2 }),
    expectedAnnualFootprint: 56,
  },
  {
    pets: new Pets({ occupants: 2, smallDogs: 2 }),
    expectedAnnualFootprint: 129,
  },
  {
    pets: new Pets({ occupants: 2, mediumDogs: 1 }),
    expectedAnnualFootprint: 179,
  },
  {
    pets: new Pets({ occupants: 2, bigDogs: 1 }),
    expectedAnnualFootprint: 300,
  },
  {
    pets: new Pets({
      occupants: 2,
      cats: 2,
      smallDogs: 1,
      mediumDogs: 1,
      bigDogs: 1,
    }),
    expectedAnnualFootprint: 599,
  },
];
