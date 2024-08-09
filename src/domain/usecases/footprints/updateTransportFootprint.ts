import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createUpdateTransportFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const updateTransportFootprint = (footprint: TransportFootprint) => {
    footprintsRepository.updateTransportFootprint(footprint);
  };
  return updateTransportFootprint;
};
