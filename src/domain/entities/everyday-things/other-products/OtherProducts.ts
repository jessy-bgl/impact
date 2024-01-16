import { WithAnnualFootprint } from "@domain/entities/types";
import {
  newManufacteredProductsFootprint,
  spendingLevelCoefficient,
} from "./constants";

export type SpendingLevel = "low" | "medium" | "high";

type Props = {
  spendingLevel?: SpendingLevel;
};

export class OtherProducts implements WithAnnualFootprint {
  spendingLevel: SpendingLevel;

  constructor({ spendingLevel }: Props) {
    this.spendingLevel = spendingLevel ?? "medium";
  }

  public get annualFootprint(): number {
    return Math.round(
      spendingLevelCoefficient(this.spendingLevel) *
        newManufacteredProductsFootprint,
    );
  }
}
