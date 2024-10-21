import { FoodFootprint } from "@domain/entities/footprints/FoodFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createFetchFoodFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const fetchFoodFootprint = (): FoodFootprint => {
    return footprintsRepository.fetchFoodFootprint();
  };

  return fetchFoodFootprint;
};
