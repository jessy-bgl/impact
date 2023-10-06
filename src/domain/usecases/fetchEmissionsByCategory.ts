import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseFetchEmissionsByCategory = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchEmissionsByCategory() {
    return emissionsRepository.fetchEmissionsByCategory();
  };
