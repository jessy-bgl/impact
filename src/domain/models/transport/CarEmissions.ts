type CarSize = "small" | "medium" | "utility" | "sedan" | "suv";

type CarType = "thermal" | "electric" | "hybrid";

type FuelType = "diesel" | "gasoline" | "biofuels";

type CarEmissionsProps = {
  regularUser: boolean;
  kmPerYear: number;
  size: CarSize;
  type: CarType;
  fuelType: FuelType;
  age: number;
  averageConsumption: number;
  averagePassengers: number;
};

export class CarEmissions {
  regularUser: boolean;
  kmPerYear: number;
  size: CarSize;
  type: CarType;
  fuelType: FuelType;
  age: number;
  averageConsumption;
  averagePassengers;
  emissionsPerYear: number = 0;

  constructor({
    regularUser = true,
    kmPerYear = 0, // km
    size = "medium",
    type = "thermal",
    fuelType = "gasoline",
    age = 5, // years
    averageConsumption = 6, // l/100km
    averagePassengers = 1.2,
  }: CarEmissionsProps) {
    this.regularUser = regularUser;
    this.kmPerYear = kmPerYear;
    this.size = size;
    this.type = type;
    this.fuelType = fuelType;
    this.age = age;
    this.averageConsumption = averageConsumption;
    this.averagePassengers = averagePassengers;
    this.computeEmissionsPerYear();
  }

  private computeEmissionsPerYear() {
    if (this.kmPerYear === 0) {
      this.emissionsPerYear = 0;
    } else if (this.regularUser) {
      this.emissionsPerYear = this.computeRegularUserFootprint();
    } else if (!this.regularUser) {
      this.emissionsPerYear = 0;
    }
  }

  private computeRegularUserFootprint(): number {
    const carUseCarbonFootprint = this.carUseFootprint;
    const amortizedManufacturing = this.amortizedManufacturingFootprint;
    return (
      (carUseCarbonFootprint + amortizedManufacturing) / this.averagePassengers
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
}
