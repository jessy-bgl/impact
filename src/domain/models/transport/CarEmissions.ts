type CarSize = "small" | "medium" | "vul" | "sedan" | "suv";

type CarEngine = "thermal" | "electric" | "hybrid";

type FuelType = "diesel" | "gasoline" | "biofuels";

// see p.80 of https://librairie.ademe.fr/cadic/7353/enquete-autopartage-2022-rapport.pdf
const SHARED_CAR_KM_PER_YEAR = 15130;

// https://librairie.ademe.fr/mobilite-et-transport/3273-elaboration-selon-les-principes-des-acv-des-bilans-energetiques-des-emissions-de-gaz-a-effet-de-serre-et-des-autres-impacts-environnementaux.html
/// l / 100km
const DefaultAverageFuelConsumption: Record<CarSize, number> = {
  small: 5,
  medium: 6,
  vul: 6,
  sedan: 7,
  suv: 8,
};

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
  averageFuelConsumption;
  averagePassengers;

  lifetime = 10; // years
  emissionsPerYear: number = 0;

  constructor({
    regularUser = true,
    kmPerYear = 0, // km
    size = "medium",
    engine = "thermal",
    fuelType = "gasoline",
    age = 5, // years
    averageFuelConsumption = DefaultAverageFuelConsumption.medium, // l/100km
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
    this.computeEmissionsPerYear();
  }

  public get regularUser() {
    return this._regularUser;
  }

  public set regularUser(isRegularUser: boolean) {
    this._regularUser = isRegularUser;
    if (!isRegularUser) {
      this.size = "medium";
      this.engine = "thermal";
      this.fuelType = "gasoline";
      this.averageFuelConsumption = DefaultAverageFuelConsumption[this.size];
    }
  }

  private computeEmissionsPerYear() {
    if (this.kmPerYear === 0) {
      this.emissionsPerYear = 0;
    } else if (this.regularUser) {
      this.emissionsPerYear = this.computeRegularUserFootprint();
    } else if (!this.regularUser) {
      this.emissionsPerYear = this.computeNonRegularUserFootprint();
    }
  }

  private computeRegularUserFootprint(): number {
    return (
      (this.carUseFootprint + this.amortizedManufacturingFootprint) /
      this.averagePassengers
    );
  }

  private computeNonRegularUserFootprint(): number {
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
    return this.kmPerYear / SHARED_CAR_KM_PER_YEAR;
  }
}
