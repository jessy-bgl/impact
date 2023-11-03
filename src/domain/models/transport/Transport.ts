import { Boat } from "./boat/Boat";
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
  boat?: Boat;
};

export class Transport {
  car: Car;
  twoWheeler: TwoWheeler;
  plane: Plane;
  boat: Boat;

  constructor({ car, twoWheeler, plane, boat }: Props) {
    this.car = new Car(car ?? {});
    this.twoWheeler = new TwoWheeler(twoWheeler ?? {});
    this.plane = new Plane(plane ?? {});
    this.boat = new Boat(boat ?? {});
  }

  public get annualFootprint(): number {
    return Math.round(
      this.car.annualFootprint +
        this.twoWheeler.annualFootprint +
        this.plane.annualFootprint +
        this.boat.annualFootprint,
    );
  }
}
