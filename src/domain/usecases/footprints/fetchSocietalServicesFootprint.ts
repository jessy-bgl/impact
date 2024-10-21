import { SocietalServicesFootprint } from "@domain/entities/footprints/SocietalServicesFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createFetchSocietalServicesFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const societalServicesFootprint = (): SocietalServicesFootprint => {
    return footprintsRepository.fetchSocietalServicesFootprint();
  };

  return societalServicesFootprint;
};
