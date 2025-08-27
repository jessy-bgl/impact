import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createUpdateTransportFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const updateTransportFootprint = (footprint: TransportFootprint) => {
    footprintsRepository.updateTransportFootprint(footprint);
  };
  return updateTransportFootprint;
};
