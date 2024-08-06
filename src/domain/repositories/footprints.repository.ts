import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";

export interface FootprintsRepository {
  fetchTransportFootprint(): TransportFootprint;
  updateTransportFootprint(footprint: TransportFootprint): void;
}
