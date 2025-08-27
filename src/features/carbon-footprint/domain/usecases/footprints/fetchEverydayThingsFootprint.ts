import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createFetchEverydayThingsFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const fetchEverydayThingsFootprint = (): EverydayThingsFootprint => {
    return footprintsRepository.fetchEverydayThingsFootprint();
  };

  return fetchEverydayThingsFootprint;
};
