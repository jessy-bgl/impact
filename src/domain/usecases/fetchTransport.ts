import { Transport } from "@domain/entities/transport/Transport";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export const createUseFetchTransport = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchTransport() {
    const fetchTransport = (): Transport => {
      return emissionsRepository.fetchTransport();
    };

    return { fetchTransport };
  };
