import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export const createUpdateFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const updateTransportFootprint = (footprint: TransportFootprint) => {
    footprintsRepository.updateTransportFootprint(footprint);
  };

  const updateHousingFootprint = (footprint: HousingFootprint) => {
    footprintsRepository.updateHousingFootprint(footprint);
  };

  const updateFoodFootprint = (footprint: FoodFootprint) => {
    footprintsRepository.updateFoodFootprint(footprint);
  };

  const updateEverydayThingsFootprint = (
    footprint: EverydayThingsFootprint,
  ) => {
    footprintsRepository.updateEverydayThingsFootprint(footprint);
  };

  return {
    updateTransportFootprint,
    updateHousingFootprint,
    updateFoodFootprint,
    updateEverydayThingsFootprint,
  };
};
