import { Car } from "./car/Car";
import { TwoWheeler } from "./two-wheeler/TwoWheeler";

// TODO : ajouter les autres categories

export enum TransportCategories {
  CAR = "car",
  TWO_WHEELER = "two-wheeler",
}

type Props = {
  car?: Car;
  twoWheeler?: TwoWheeler;
};

export class Transport {
  car: Car;
  twoWheeler: TwoWheeler;

  constructor({ car, twoWheeler }: Props) {
    this.car = new Car(car ?? {});
    this.twoWheeler = new TwoWheeler(twoWheeler ?? {});
  }

  public get annualFootprint(): number {
    return this.car.annualFootprint + this.twoWheeler.annualFootprint;
  }
}
