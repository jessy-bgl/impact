import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createUpdateFoodFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const updateFoodFootprint = (footprint: FoodFootprint) => {
    footprintsRepository.updateFoodFootprint(footprint);
  };
  return updateFoodFootprint;
};
