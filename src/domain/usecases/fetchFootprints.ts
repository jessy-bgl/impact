import { Footprints } from "../models/Footprint";
import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseFetchFootprints = (
  emissionsRepository: EmissionsRepository,
) =>
  function useFetchFootprints(): Footprints {
    return emissionsRepository.fetchFootprints();
  };
