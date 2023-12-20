import { consumableProductsDataset } from "@domain/models/__tests__/everyday-things/consumable-products/dataset";
import { ConsumableProducts } from "@domain/models/everyday-things/consumable-products/ConsumableProducts";

describe("Consumable products", () => {
  describe("annualFootprint", () => {
    it.each<[number, ConsumableProducts]>(
      consumableProductsDataset.map(
        ({ consumableProducts, expectedAnnualFootprint }) => [
          expectedAnnualFootprint,
          consumableProducts,
        ],
      ),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, consumableProducts) => {
        expect(
          new ConsumableProducts(consumableProducts).annualFootprint,
        ).toEqual(expectedAnnualFootprint);
      },
    );
  });
});
