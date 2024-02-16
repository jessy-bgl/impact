import { Food } from "@domain/entities/categories/food/Food";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export const createUseFetchFood = (emissionsRepository: EmissionsRepository) =>
  function useFetchFood() {
    const fetchFood = (): Food => {
      return emissionsRepository.fetchFood();
    };

    return { fetchFood };
  };
