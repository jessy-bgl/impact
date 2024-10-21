import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createFetchTransportFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const fetchTransportFootprint = (): TransportFootprint => {
    return footprintsRepository.fetchTransportFootprint();
  };

  return fetchTransportFootprint;
};
