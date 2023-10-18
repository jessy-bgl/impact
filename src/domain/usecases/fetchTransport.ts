import { Transport } from "../models/transport/Transport";
import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseFetchTransport = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchTransport() {
    const fetchTransport = (): Transport => {
      return emissionsRepository.fetchTransport();
    };

    return { fetchTransport };
  };
