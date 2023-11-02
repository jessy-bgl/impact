import { Car } from "./car/Car";
import { Plane } from "./plane/Plane";
import { TwoWheeler } from "./two-wheeler/TwoWheeler";

// TODO : ajouter les autres categories

export enum TransportCategories {
  CAR = "car",
  TWO_WHEELER = "two-wheeler",
  PLANE = "plane",
}

type Props = {
  car?: Car;
  twoWheeler?: TwoWheeler;
  plane?: Plane;
};

export class Transport {
  car: Car;
  twoWheeler: TwoWheeler;
  plane: Plane;

  constructor({ car, twoWheeler, plane }: Props) {
    this.car = new Car(car ?? {});
    this.twoWheeler = new TwoWheeler(twoWheeler ?? {});
    this.plane = new Plane(plane ?? {});
  }

  public get annualFootprint(): number {
    return Math.round(
      this.car.annualFootprint +
        this.twoWheeler.annualFootprint +
        this.plane.annualFootprint,
    );
  }
}
