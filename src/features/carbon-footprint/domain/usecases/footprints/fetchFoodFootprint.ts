import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createFetchFoodFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const fetchFoodFootprint = (): FoodFootprint => {
    return footprintsRepository.fetchFoodFootprint();
  };

  return fetchFoodFootprint;
};
