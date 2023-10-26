/**
 * footprint = kgCO2e or kgC02e/km
 */

import {
  airConditionerFootprint,
  averageCarKmPerYear,
  defaultAverageFootPrintPerLiter,
  defaultAverageFuelConsumption,
  defaultEngine,
  defaultFuelType,
  defaultSize,
  electricCarFootprint,
  electricCarManufacturingFootprint,
  electricMediumCarFootprint,
  electricSmallCarFootprint,
  hybridCarManufacturingFootprint,
  defaultCarLifetime,
  sharedCarKmPerYear,
  thermalCarManufacturingFootprint,
  thermalMaintenanceFootprint,
  defaultYears,
  defaultAveragePassengers,
} from "./constants";
import { WithAnnualFootprint } from "../types";

export type CarSize = "small" | "medium" | "vul" | "sedan" | "suv";
export const carSizes: CarSize[] = ["small", "medium", "vul", "sedan", "suv"];

export type CarEngine = "thermal" | "hybrid" | "electric";
export const carEngines: CarEngine[] = ["thermal", "hybrid", "electric"];

export type FuelType = "diesel" | "gasoline" | "biofuels";
export const fuelTypes: FuelType[] = ["diesel", "gasoline", "biofuels"];

type Props = {
  regularUser?: boolean;
  kmPerYear?: number;
  size?: CarSize;
  engine?: CarEngine;
  fuelType?: FuelType;
  age?: number;
  averageFuelConsumption?: number;
  averagePassengers?: number;
};

export class Car implements WithAnnualFootprint {
  regularUser: boolean;
  kmPerYear: number;
  size: CarSize;
  engine: CarEngine;
  fuelType: FuelType;
  age: number;
  lifetime = defaultCarLifetime;
  averageFuelConsumption;
  averagePassengers;

  constructor({
    regularUser = true,
    kmPerYear = averageCarKmPerYear,
    age = defaultYears,
    size = defaultSize,
    engine = defaultEngine,
    fuelType = defaultFuelType,
    averageFuelConsumption = defaultAverageFuelConsumption.medium, // l/100km
    averagePassengers = defaultAveragePassengers,
  }: Props) {
    this.regularUser = regularUser;
    this.kmPerYear = kmPerYear;
    this.size = size;
    this.engine = engine;
    this.fuelType = fuelType;
    this.age = age;
    this.averageFuelConsumption = averageFuelConsumption;
    this.averagePassengers = averagePassengers;
  }

  public initValuesForNonRegularUser() {
    this.size = defaultSize;
    this.engine = defaultEngine;
    this.fuelType = defaultFuelType;
    this.averageFuelConsumption = defaultAverageFuelConsumption[this.size];
  }

  public get annualFootprint(): number {
    if (this.kmPerYear === 0) return 0;
    if (this.regularUser) return Math.floor(this.regularUserFootprint);
    return Math.floor(this.nonRegularUserFootprint);
  }

  private get regularUserFootprint(): number {
    return (
      (this.carUseFootprint + this.amortizedManufacturingFootprint) /
      this.averagePassengers
    );
  }

  private get nonRegularUserFootprint(): number {
    return (
      ((this.manufacturingFootprint / this.lifetime) * this.rentalFactor +
        this.carUseFootprint) /
      this.averagePassengers
    );
  }

  private get carUseFootprint(): number {
    return this.kmPerYear * (this.footprintPerKm + this.footprintBasePerKm);
  }

  // http://www2.ademe.fr/servlet/KBaseShow?catid=13655
  private get footprintPerKm(): number {
    if (this.engine === "electric") {
      if (this.size === "small") return electricSmallCarFootprint;
      if (this.size === "medium") return electricMediumCarFootprint;
      return electricCarFootprint;
    }

    const thermalCarFootprint =
      (this.averageFuelConsumption / 100) *
      defaultAverageFootPrintPerLiter[this.fuelType];

    if (this.engine === "hybrid") return thermalCarFootprint * 0.85;

    return thermalCarFootprint;
  }

  private get footprintBasePerKm(): number {
    return this.weightedMaintenanceFootprint + this.airConditionerFootprint;
  }

  // https://izi-by-edf.fr/blog/voiture-hybride-entretien/
  private get weightedMaintenanceFootprint(): number {
    if (this.engine === "hybrid") return thermalMaintenanceFootprint * 0.9;
    if (this.engine === "electric") return thermalMaintenanceFootprint * 0.75;
    return thermalMaintenanceFootprint;
  }

  private get airConditionerFootprint(): number {
    return airConditionerFootprint;
  }

  private get amortizedManufacturingFootprint(): number {
    return this.manufacturingFootprint * this.amortization;
  }

  private get manufacturingFootprint(): number {
    if (this.engine === "hybrid")
      return hybridCarManufacturingFootprint[this.size];
    if (this.engine === "electric")
      return electricCarManufacturingFootprint[this.size];
    return thermalCarManufacturingFootprint[this.size];
  }

  private get amortization(): number {
    if (this.age < 10) return 1 / defaultCarLifetime;
    return 0;
  }

  private get rentalFactor(): number {
    return this.kmPerYear / sharedCarKmPerYear;
  }
}
