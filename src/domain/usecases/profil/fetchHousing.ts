import { Housing } from "@domain/entities/categories/housing/Housing";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export const createUseFetchHousing = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchHousing() {
    const fetchHousing = (): Housing => {
      return emissionsRepository.fetchHousing();
    };

    return { fetchHousing };
  };
