import { FoodFootprint } from "@domain/entities/footprints/FoodFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createUpdateFoodFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const updateFoodFootprint = (footprint: FoodFootprint) => {
    footprintsRepository.updateFoodFootprint(footprint);
  };
  return updateFoodFootprint;
};
