import { weeksInYear } from "@domain/entities/categories/constants";
import { WithAnnualFootprint } from "@domain/entities/categories/types";
import {
  cigaretteFootprint,
  cigarettePacksPerWeek,
  cigarettesInPack,
} from "./constants";

export type CigarettesWeeklyConsumption =
  | "none"
  | "onePackPerMonth"
  | "onePackPerWeek"
  | "onePackPerDay";

type Props = {
  weeklyConsumption?: CigarettesWeeklyConsumption;
};

export class Tobacco implements WithAnnualFootprint {
  weeklyConsumption: CigarettesWeeklyConsumption;

  constructor({ weeklyConsumption }: Props) {
    this.weeklyConsumption = weeklyConsumption ?? "none";
  }

  public get annualFootprint(): number {
    return Math.round(
      cigarettePacksPerWeek(this.weeklyConsumption) *
        cigarettesInPack *
        weeksInYear *
        cigaretteFootprint,
    );
  }
}
