import { EverydayThingsFootprint } from "@domain/entities/footprints/EverydayThingsFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createFetchEverydayThingsFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const fetchEverydayThingsFootprint = (): EverydayThingsFootprint => {
    return footprintsRepository.fetchEverydayThingsFootprint();
  };

  return fetchEverydayThingsFootprint;
};
