import { HousingFootprint } from "@domain/entities/footprints/HousingFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createUpdateHousingFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const updateHousingFootprint = (footprint: HousingFootprint) => {
    footprintsRepository.updateHousingFootprint(footprint);
  };
  return updateHousingFootprint;
};
