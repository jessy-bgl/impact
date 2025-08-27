import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createFetchTransportFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const fetchTransportFootprint = (): TransportFootprint => {
    return footprintsRepository.fetchTransportFootprint();
  };

  return fetchTransportFootprint;
};
