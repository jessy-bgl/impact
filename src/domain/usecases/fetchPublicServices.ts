import { PublicServices } from "../models/public-services/PublicServices";
import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseFetchPublicServices = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchPublicServices() {
    const fetchPublicServices = (): PublicServices => {
      return emissionsRepository.fetchPublicServices();
    };

    return { fetchPublicServices };
  };
