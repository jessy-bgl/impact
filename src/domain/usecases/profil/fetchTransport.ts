import { Transport } from "@domain/entities/transport/Transport";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export const createUseFetchTransport = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchTransport() {
    const fetchTransport = (): Transport => {
      return emissionsRepository.fetchTransport();
    };

    return { fetchTransport };
  };
