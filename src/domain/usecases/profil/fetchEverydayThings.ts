import { EmissionsRepository } from "@domain/repositories/emissions.repository";

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
