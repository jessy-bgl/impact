import { FootprintByCategory } from "../models/transport/car/FootprintCategories";
import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseFetchFootprintByCategory = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchFootprintByCategory(): FootprintByCategory[] {
    return emissionsRepository.fetchFootprintByCategory();
  };
