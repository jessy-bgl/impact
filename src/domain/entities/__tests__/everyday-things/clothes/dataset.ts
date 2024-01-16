import { Clothes } from "@domain/entities/everyday-things/clothes/Clothes";

export const clothesDataset: {
  clothes: Clothes;
  expectedAnnualFootprint: number;
}[] = [
  {
    clothes: new Clothes({}),
    expectedAnnualFootprint: 0,
  },
  {
    clothes: new Clothes({
      tshirts: 1,
      shirts: 1,
      sweaters: 1,
      sweatshirts: 1,
      shorts: 1,
      coats: 1,
      dresses: 1,
      pants: 1,
      shoes: 1,
      smallItems: 1,
      bigItems: 1,
    }),
    expectedAnnualFootprint: 308,
  },
];
