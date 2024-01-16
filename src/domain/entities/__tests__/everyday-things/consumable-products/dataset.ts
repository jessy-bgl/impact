import { ConsumableProducts } from "@domain/entities/everyday-things/consumable-products/ConsumableProducts";

export const consumableProductsDataset: {
  consumableProducts: ConsumableProducts;
  expectedAnnualFootprint: number;
}[] = [
  {
    consumableProducts: new ConsumableProducts({}),
    expectedAnnualFootprint: 26,
  },
  {
    consumableProducts: new ConsumableProducts({ consumption: "low" }),
    expectedAnnualFootprint: 13,
  },
  {
    consumableProducts: new ConsumableProducts({ consumption: "medium" }),
    expectedAnnualFootprint: 26,
  },
  {
    consumableProducts: new ConsumableProducts({ consumption: "high" }),
    expectedAnnualFootprint: 65,
  },
];
