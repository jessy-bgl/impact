import { Transport } from "@domain/models/transport/Transport";
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
