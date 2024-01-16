import { Boat } from "@domain/entities/transport/boat/Boat";
import { Car } from "@domain/entities/transport/car/Car";
import { Plane } from "@domain/entities/transport/plane/Plane";
import { PublicTransport } from "@domain/entities/transport/public-transport/PublicTransport";
import { TwoWheeler } from "@domain/entities/transport/two-wheeler/TwoWheeler";
import { WithAnnualFootprint } from "@domain/entities/types";

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
