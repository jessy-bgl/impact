import { SpendingLevel } from "@domain/entities/categories/everyday-things/other-products/OtherProducts";

export const newManufacteredProductsFootprint = 130;

export const spendingLevelCoefficient = (spendingLevel: SpendingLevel) => {
  switch (spendingLevel) {
    case "low":
      return 0.65;
    case "medium":
      return 1;
    case "high":
      return 1.5;
  }
};
