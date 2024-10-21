import { HousingFootprint } from "@domain/entities/footprints/HousingFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createFetchHousingFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const fetchHousingFootprint = (): HousingFootprint => {
    return footprintsRepository.fetchHousingFootprint();
  };

  return fetchHousingFootprint;
};
