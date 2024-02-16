import { OtherProducts } from "@domain/entities/categories/everyday-things/other-products/OtherProducts";
import { otherProductsDataset } from "./dataset";

describe("Other", () => {
  describe("annualFootprint", () => {
    it.each<[number, OtherProducts]>(
      otherProductsDataset.map(({ otherProducts, expectedAnnualFootprint }) => [
        expectedAnnualFootprint,
        otherProducts,
      ]),
    )(
      "should give an annual footprint equal to %i kgCO2e",
      (expectedAnnualFootprint, otherProducts) => {
        expect(new OtherProducts(otherProducts).annualFootprint).toEqual(
          expectedAnnualFootprint,
        );
      },
    );
  });
});
