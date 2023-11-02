import { defaultAverageFootprintPerKm, defaultAverageSpeed } from "./constants";
import { WithAnnualFootprint } from "../types";

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
    const shortHaulFootprint =
      this.hoursPerYearInShortHaul *
      defaultAverageSpeed["short"] *
      defaultAverageFootprintPerKm["short"];

    const mediumHaulFootprint =
      this.hoursPerYearInMediumHaul *
      defaultAverageSpeed["medium"] *
      defaultAverageFootprintPerKm["medium"];

    const longHaulFootprint =
      this.hoursPerYearInLongHaul *
      defaultAverageSpeed["long"] *
      defaultAverageFootprintPerKm["long"];

    return Math.round(
      shortHaulFootprint + mediumHaulFootprint + longHaulFootprint,
    );
  }
}
