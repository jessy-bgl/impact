import { WithAnnualFootprint } from "@domain/models/types";
import { consumableProductsFootprint } from "./constants";

type Consumption = "low" | "medium" | "high";

type Props = {
  consumption?: Consumption;
};

export class ConsumableProducts implements WithAnnualFootprint {
  consumption: Consumption;

  constructor({ consumption }: Props) {
    this.consumption = consumption ?? "medium";
  }

  public get annualFootprint(): number {
    return Math.round(this.monthlyFootprint * 12);
  }

  // eslint-disable-next-line getter-return
  private get monthlyFootprint(): number {
    switch (this.consumption) {
      case "low":
        return consumableProductsFootprint;
      case "medium":
        return consumableProductsFootprint * 2;
      case "high":
        return consumableProductsFootprint * 5;
    }
  }
}
