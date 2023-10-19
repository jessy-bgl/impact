import { Car } from "./car/Car";

export enum TransportCategories {
  CAR = "car",
}

type Props = {
  car?: Car;
};

export class Transport {
  car: Car;

  constructor({ car }: Props) {
    this.car = new Car(car ?? {});
  }

  public get annualFootprint(): number {
    // TODO : ajouter les autres categories
    return this.car.annualFootprint;
  }
}
