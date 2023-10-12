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
} from "./carDefaultValues";

export type CarSize = "small" | "medium" | "vul" | "sedan" | "suv";

export type CarEngine = "thermal" | "electric" | "hybrid";

export type FuelType = "diesel" | "gasoline" | "biofuels";

type CarEmissionsProps = {
  regularUser: boolean;
  kmPerYear: number;
  size: CarSize;
  engine: CarEngine;
  fuelType: FuelType;
  age: number;
  averageFuelConsumption: number;
  averagePassengers: number;
};

export class CarEmissions {
  private _regularUser: boolean;
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
    kmPerYear = averageCarKmPerYear, // km
    age = 5, // years
    size = defaultSize,
    engine = defaultEngine,
    fuelType = defaultFuelType,
    averageFuelConsumption = defaultAverageFuelConsumption.medium, // l/100km
    averagePassengers = 1.2,
  }: CarEmissionsProps) {
    this._regularUser = regularUser;
    this.kmPerYear = kmPerYear;
    this.size = size;
    this.engine = engine;
    this.fuelType = fuelType;
    this.age = age;
    this.averageFuelConsumption = averageFuelConsumption;
    this.averagePassengers = averagePassengers;
  }

  public get regularUser() {
    return this._regularUser;
  }

  public set regularUser(isRegularUser: boolean) {
    this._regularUser = isRegularUser;
    if (!isRegularUser) {
      this.size = defaultSize;
      this.engine = defaultEngine;
      this.fuelType = defaultFuelType;
      this.averageFuelConsumption = defaultAverageFuelConsumption[this.size];
    }
  }

  get annualEmissions(): number {
    if (this.kmPerYear === 0) return 0;
    if (this.regularUser) return this.regularUserFootprint;
    return this.nonRegularUserFootprint;
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