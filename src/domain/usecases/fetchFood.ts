import { Food } from "../models/food/Food";
import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseFetchFood = (emissionsRepository: EmissionsRepository) =>
  function useFetchFood() {
    const fetchFood = (): Food => {
      return emissionsRepository.fetchFood();
    };

    return { fetchFood };
  };
