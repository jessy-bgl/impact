import { PublicServices } from "@domain/entities/public-services/PublicServices";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export const createUseFetchPublicServices = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchPublicServices() {
    const fetchPublicServices = (): PublicServices => {
      return emissionsRepository.fetchPublicServices();
    };

    return { fetchPublicServices };
  };
