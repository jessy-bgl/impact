import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createUpdateHousingFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const updateHousingFootprint = (footprint: HousingFootprint) => {
    footprintsRepository.updateHousingFootprint(footprint);
  };
  return updateHousingFootprint;
};
