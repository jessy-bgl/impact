import { Housing } from "@domain/entities/housing/Housing";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export const createUseFetchHousing = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchHousing() {
    const fetchHousing = (): Housing => {
      return emissionsRepository.fetchHousing();
    };

    return { fetchHousing };
  };
