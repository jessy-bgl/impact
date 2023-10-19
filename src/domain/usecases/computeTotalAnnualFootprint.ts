import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseComputeTotalAnnualFootprint = (
  emissionsRepository: EmissionsRepository,
) =>
  function useComputeTotalAnnualFootprint() {
    const computeTotalAnnualFootprint = (): number => {
      const transport = emissionsRepository.fetchTransport();

      // TODO : ajouter les autres catégories

      return transport.annualFootprint;
    };

    return { computeTotalAnnualFootprint };
  };
