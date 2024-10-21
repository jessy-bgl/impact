import { WithAnnualFootprint } from "@domain/entities/footprints/types";
import { roundFootprint } from "./utils";

type Props = {
  drinksFootprint?: number;
  mealsFootprint?: number;
  wasteFootprint?: number;
};

export class FoodFootprint implements WithAnnualFootprint {
  drinksFootprint: number;
  mealsFootprint: number;
  wasteFootprint: number;

  constructor({ drinksFootprint, mealsFootprint, wasteFootprint }: Props) {
    this.drinksFootprint = roundFootprint(drinksFootprint) ?? 0;
    this.mealsFootprint = roundFootprint(mealsFootprint) ?? 0;
    this.wasteFootprint = roundFootprint(wasteFootprint) ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.drinksFootprint + this.mealsFootprint + this.wasteFootprint,
    );
  }
}
