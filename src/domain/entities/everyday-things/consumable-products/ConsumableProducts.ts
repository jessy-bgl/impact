import { WithAnnualFootprint } from "@domain/entities/types";
import { consumableProductsFootprint } from "./constants";

export type ConsumptionFrequency = "low" | "medium" | "high";

type Props = {
  consumption?: ConsumptionFrequency;
};

export class ConsumableProducts implements WithAnnualFootprint {
  consumption: ConsumptionFrequency;

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
