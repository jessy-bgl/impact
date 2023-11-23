import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseComputeTotalAnnualFootprint = (
  emissionsRepository: EmissionsRepository,
) =>
  function useComputeTotalAnnualFootprint() {
    const computeTotalAnnualFootprint = (): number => {
      const transport = emissionsRepository.fetchTransport();
      const food = emissionsRepository.fetchFood();
      const publicServices = emissionsRepository.fetchPublicServices();

      // TODO : ajouter les autres catégories

      return (
        transport.annualFootprint +
        food.annualFootprint +
        publicServices.annualFootprint
      );
    };

    return { computeTotalAnnualFootprint };
  };
