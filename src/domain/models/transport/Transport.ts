import { Car } from "./car/Car";

export enum TransportCategories {
  CAR = "car",
}

type Props = {
  car: Car;
};

export class Transport {
  car: Car;

  constructor({ car }: Props) {
    this.car = car;
  }

  public get annualFootprint(): number {
    return this.car.annualFootprint;
  }
}
