import {
  defaultAverageFuelConsumption,
  defaultEngine,
  defaultFuelType,
  defaultSize,
  lifetime,
  sharedCarKmPerYear,
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
  lifetime = lifetime;
  averageFuelConsumption;
  averagePassengers;

  constructor({
    regularUser = true,
    kmPerYear = 0, // km
    size = defaultSize,
    engine = defaultEngine,
    fuelType = defaultFuelType,
    age = 5, // years
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

  get emissionsPerYear(): number {
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

  private get footprintPerKm(): number {
    // TODO
    return 0;
  }

  private get footprintBasePerKm(): number {
    return (
      this.weightedMaintenanceFootprintPerKm + this.airConditionerFootprintPerKm
    );
  }

  private get weightedMaintenanceFootprintPerKm(): number {
    // TODO
    return 0;
  }

  private get airConditionerFootprintPerKm(): number {
    // TODO
    return 0;
  }

  private get amortizedManufacturingFootprint(): number {
    return this.manufacturingFootprint * this.amortization;
  }

  private get manufacturingFootprint(): number {
    // TODO
    return 0;
  }

  private get amortization(): number {
    // TODO
    return 0;
  }

  private get rentalFactor(): number {
    return this.kmPerYear / sharedCarKmPerYear;
  }
}
