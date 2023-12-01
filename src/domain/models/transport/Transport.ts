import { Boat } from "@domain/models/transport/boat/Boat";
import { Car } from "@domain/models/transport/car/Car";
import { Plane } from "@domain/models/transport/plane/Plane";
import { PublicTransport } from "@domain/models/transport/public-transport/PublicTransport";
import { TwoWheeler } from "@domain/models/transport/two-wheeler/TwoWheeler";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  car?: Car;
  twoWheeler?: TwoWheeler;
  plane?: Plane;
  boat?: Boat;
  publicTransport?: PublicTransport;
};

export class Transport implements WithAnnualFootprint {
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
