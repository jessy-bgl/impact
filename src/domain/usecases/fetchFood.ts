import { Food } from "@domain/models/food/Food";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export const createUseFetchFood = (emissionsRepository: EmissionsRepository) =>
  function useFetchFood() {
    const fetchFood = (): Food => {
      return emissionsRepository.fetchFood();
    };

    return { fetchFood };
  };
