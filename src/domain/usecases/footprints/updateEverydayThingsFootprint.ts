import { EverydayThingsFootprint } from "@domain/entities/footprints/EverydayThingsFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

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
