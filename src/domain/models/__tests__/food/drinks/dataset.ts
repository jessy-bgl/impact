import { Drinks } from "@domain/models/food/drinks/Drinks";

export const drinksDataset: {
  drinks: Drinks;
  expectedFootprint: number;
}[] = [
  {
    drinks: new Drinks({
      sodaLitersPerWeek: 0,
      alcoholLitersPerWeek: 0,
      hotDrinksPerWeek: {
        coffee: 0,
        tea: 0,
        chocolate: 0,
      },
      milkType: "cow",
      bottledWater: false,
    }),
    expectedFootprint: 0,
  },
  {
    drinks: new Drinks({
      sodaLitersPerWeek: 1,
      alcoholLitersPerWeek: 1,
      hotDrinksPerWeek: {
        coffee: 7,
        tea: 0,
        chocolate: 0,
      },
      milkType: "cow",
      bottledWater: false,
    }),
    expectedFootprint: 127,
  },
  {
    drinks: new Drinks({
      sodaLitersPerWeek: 2,
      alcoholLitersPerWeek: 0,
      hotDrinksPerWeek: {
        coffee: 0,
        tea: 2,
        chocolate: 5,
      },
      milkType: "cow",
      bottledWater: true,
    }),
    expectedFootprint: 411,
  },
  {
    drinks: new Drinks({
      sodaLitersPerWeek: 2,
      alcoholLitersPerWeek: 0,
      hotDrinksPerWeek: {
        coffee: 0,
        tea: 2,
        chocolate: 5,
      },
      milkType: "soy",
      bottledWater: true,
    }),
    expectedFootprint: 365,
  },
  {
    drinks: new Drinks({
      sodaLitersPerWeek: 2,
      alcoholLitersPerWeek: 0,
      hotDrinksPerWeek: {
        coffee: 0,
        tea: 2,
        chocolate: 5,
      },
      milkType: "oat",
      bottledWater: true,
    }),
    expectedFootprint: 370,
  },
];
