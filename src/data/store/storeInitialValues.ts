import { Transport } from "../../domain/models/transport/Transport";
import { Car } from "../../domain/models/transport/car/Car";

export const defaultTransport = new Transport({ car: new Car({}) });
