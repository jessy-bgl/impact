import { OtherProducts } from "@domain/entities/everyday-things/other-products/OtherProducts";

export const otherProductsDataset: {
  otherProducts: OtherProducts;
  expectedAnnualFootprint: number;
}[] = [
  {
    otherProducts: new OtherProducts({}),
    expectedAnnualFootprint: 130,
  },
  {
    otherProducts: new OtherProducts({ spendingLevel: "low" }),
    expectedAnnualFootprint: 85,
  },
  {
    otherProducts: new OtherProducts({ spendingLevel: "medium" }),
    expectedAnnualFootprint: 130,
  },
  {
    otherProducts: new OtherProducts({ spendingLevel: "high" }),
    expectedAnnualFootprint: 195,
  },
];
