import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { Footprints } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";

export interface FootprintsRepository {
  fetchFootprints(): Footprints;
  updateTransportFootprint(footprint: TransportFootprint): void;
  updateFoodFootprint(footprint: FoodFootprint): void;
  updateHousingFootprint(footprint: HousingFootprint): void;
  updateEverydayThingsFootprint(footprint: EverydayThingsFootprint): void;
  updateSocietalServicesFootprint(footprint: SocietalServicesFootprint): void;
}
