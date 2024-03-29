import { WithAnnualFootprint } from "@domain/entities/categories/types";
import { averagePlaneSpeed, defaultAverageFootprintPerKm } from "./constants";

export type haulFlight = "short" | "medium" | "long";

type Props = {
  usage?: boolean;
  hoursPerYearInShortHaul?: number;
  hoursPerYearInMediumHaul?: number;
  hoursPerYearInLongHaul?: number;
};

export class Plane implements WithAnnualFootprint {
  usage: boolean;
  hoursPerYearInShortHaul: number;
  hoursPerYearInMediumHaul: number;
  hoursPerYearInLongHaul: number;

  constructor({
    usage = false,
    hoursPerYearInShortHaul = 0,
    hoursPerYearInMediumHaul = 0,
    hoursPerYearInLongHaul = 0,
  }: Props) {
    this.usage = usage;
    this.hoursPerYearInShortHaul = hoursPerYearInShortHaul;
    this.hoursPerYearInMediumHaul = hoursPerYearInMediumHaul;
    this.hoursPerYearInLongHaul = hoursPerYearInLongHaul;
  }

  public resetValues() {
    this.usage = false;
    this.hoursPerYearInShortHaul = 0;
    this.hoursPerYearInMediumHaul = 0;
    this.hoursPerYearInLongHaul = 0;
  }

  public get annualFootprint(): number {
    if (!this.usage) return 0;

    const shortHaulFootprint =
      this.hoursPerYearInShortHaul *
      averagePlaneSpeed["short"] *
      defaultAverageFootprintPerKm["short"];

    const mediumHaulFootprint =
      this.hoursPerYearInMediumHaul *
      averagePlaneSpeed["medium"] *
      defaultAverageFootprintPerKm["medium"];

    const longHaulFootprint =
      this.hoursPerYearInLongHaul *
      averagePlaneSpeed["long"] *
      defaultAverageFootprintPerKm["long"];

    return Math.round(
      shortHaulFootprint + mediumHaulFootprint + longHaulFootprint,
    );
  }
}
