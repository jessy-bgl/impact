import { PublicServices } from "@domain/entities/categories/public-services/PublicServices";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export const createUseFetchPublicServices = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchPublicServices() {
    const fetchPublicServices = (): PublicServices => {
      return emissionsRepository.fetchPublicServices();
    };

    return { fetchPublicServices };
  };
