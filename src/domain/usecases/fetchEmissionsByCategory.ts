import { EmissionsByCategory } from "../models/transport/car/EmissionCategories";
import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseFetchEmissionsByCategory = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchEmissionsByCategory(): EmissionsByCategory[] {
    return emissionsRepository.fetchEmissionsByCategory();
  };
