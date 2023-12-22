import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export const createUseFetchEverydayThings = (
  emissionsRepository: EmissionsRepository,
) => {
  return function useFetchEverydayThings() {
    const fetchEverydayThings = () => {
      return emissionsRepository.fetchEverydayThings();
    };

    return { fetchEverydayThings };
  };
};
