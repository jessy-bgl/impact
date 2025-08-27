import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createUpdateEverydayThingsFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const updateEverydayThingsFootprint = (
    footprint: EverydayThingsFootprint,
  ) => {
    footprintsRepository.updateEverydayThingsFootprint(footprint);
  };
  return updateEverydayThingsFootprint;
};
