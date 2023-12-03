import {
  defaultTwoWheelerType,
  thermalMaintenanceFootprint,
  twoWheelerDefaultFootprint,
} from "./constants";
import { WithAnnualFootprint } from "@domain/models/types";

export type TwoWheelerType =
  | "thermalScooter"
  | "electricScooter"
  | "motorbikeLT250"
  | "motorbikeGT250";

export const TwoWheelerTypes: TwoWheelerType[] = [
  "thermalScooter",
  "electricScooter",
  "motorbikeLT250",
  "motorbikeGT250",
];

type Props = {
  usage?: boolean;
  type?: TwoWheelerType;
  kmPerYear?: number;
};

export class TwoWheeler implements WithAnnualFootprint {
  usage: boolean;
  type: TwoWheelerType;
  kmPerYear: number;

  constructor({
    usage = false,
    type = defaultTwoWheelerType,
    kmPerYear = 0,
  }: Props) {
    this.usage = usage;
    this.type = type;
    this.kmPerYear = kmPerYear;
  }

  public resetValues() {
    this.usage = false;
    this.type = defaultTwoWheelerType;
    this.kmPerYear = 0;
  }

  public get annualFootprint(): number {
    if (!this.usage || this.kmPerYear === 0) return 0;
    return Math.floor(
      (this.footprintPerKm + this.weightedMaintenanceFootprint) *
        this.kmPerYear,
    );
  }

  private get footprintPerKm(): number {
    return twoWheelerDefaultFootprint[this.type];
  }

  private get weightedMaintenanceFootprint(): number {
    const maintenanceFootprint = this.maintenanceFootprint;
    if (this.type === "electricScooter") return maintenanceFootprint * 0.75;
    return maintenanceFootprint;
  }

  private get maintenanceFootprint(): number {
    return thermalMaintenanceFootprint;
  }
}
