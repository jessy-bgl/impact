import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createFetchSocietalServicesFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const societalServicesFootprint = (): SocietalServicesFootprint => {
    return footprintsRepository.fetchSocietalServicesFootprint();
  };

  return societalServicesFootprint;
};
