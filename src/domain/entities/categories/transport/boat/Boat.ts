import { WithAnnualFootprint } from "@domain/entities/categories/types";
import { averageFootprintPerKm, averageSpeed } from "./constants";

type Props = {
  usage?: boolean;
  hoursPerYear?: number;
};

export class Boat implements WithAnnualFootprint {
  usage: boolean;
  hoursPerYear: number;

  constructor({ usage = false, hoursPerYear = 0 }: Props) {
    this.usage = usage;
    this.hoursPerYear = hoursPerYear;
  }

  public resetValues() {
    this.usage = false;
    this.hoursPerYear = 0;
  }

  public get annualFootprint(): number {
    if (!this.usage) return 0;
    return Math.round(this.hoursPerYear * averageSpeed * averageFootprintPerKm);
  }
}
