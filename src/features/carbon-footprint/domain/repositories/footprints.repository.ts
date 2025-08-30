import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";

export interface FootprintsRepository {
  updateTransportFootprint(footprint: TransportFootprint): void;
  updateFoodFootprint(footprint: FoodFootprint): void;
  updateHousingFootprint(footprint: HousingFootprint): void;
  updateEverydayThingsFootprint(footprint: EverydayThingsFootprint): void;
  updateSocietalServicesFootprint(footprint: SocietalServicesFootprint): void;
}
