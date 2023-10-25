import { Car } from "./car/Car";

// TODO : ajouter les autres categories

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
    return this.car.annualFootprint;
  }
}
