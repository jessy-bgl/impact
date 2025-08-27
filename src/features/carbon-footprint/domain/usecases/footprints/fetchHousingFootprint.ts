import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createFetchHousingFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const fetchHousingFootprint = (): HousingFootprint => {
    return footprintsRepository.fetchHousingFootprint();
  };

  return fetchHousingFootprint;
};
