import { Boat } from "./boat/Boat";
import { Car } from "./car/Car";
import { Plane } from "./plane/Plane";
import { PublicTransport } from "./public-transport/PublicTransport";
import { TwoWheeler } from "./two-wheeler/TwoWheeler";

// TODO : ajouter les autres categories

export enum TransportCategories {
  CAR = "car",
  TWO_WHEELER = "two-wheeler",
  PLANE = "plane",
  PUBLIC_TRANSPORT = "public-transport",
}

type Props = {
  car?: Car;
  twoWheeler?: TwoWheeler;
  plane?: Plane;
  boat?: Boat;
  publicTransport?: PublicTransport;
};

export class Transport {
  car: Car;
  twoWheeler: TwoWheeler;
  plane: Plane;
  boat: Boat;
  publicTransport: PublicTransport;

  constructor({ car, twoWheeler, plane, boat, publicTransport }: Props) {
    this.car = new Car(car ?? {});
    this.twoWheeler = new TwoWheeler(twoWheeler ?? {});
    this.plane = new Plane(plane ?? {});
    this.boat = new Boat(boat ?? {});
    this.publicTransport = new PublicTransport(publicTransport ?? {});
  }

  public get annualFootprint(): number {
    return Math.round(
      this.car.annualFootprint +
        this.twoWheeler.annualFootprint +
        this.plane.annualFootprint +
        this.boat.annualFootprint +
        this.publicTransport.annualFootprint,
    );
  }
}
