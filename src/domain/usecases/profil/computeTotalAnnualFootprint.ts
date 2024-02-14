import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export const createUseComputeTotalAnnualFootprint = (
  emissionsRepository: EmissionsRepository,
) =>
  function useComputeTotalAnnualFootprint() {
    const computeTotalAnnualFootprint = (): number => {
      const transport = emissionsRepository.fetchTransport();
      const food = emissionsRepository.fetchFood();
      const housing = emissionsRepository.fetchHousing();
      const everydayThings = emissionsRepository.fetchEverydayThings();
      const publicServices = emissionsRepository.fetchPublicServices();

      return (
        transport.annualFootprint +
        food.annualFootprint +
        housing.annualFootprint +
        everydayThings.annualFootprint +
        publicServices.annualFootprint
      );
    };

    return { computeTotalAnnualFootprint };
  };
