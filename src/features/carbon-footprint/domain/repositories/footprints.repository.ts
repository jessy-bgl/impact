import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";

export interface FootprintsRepository {
  fetchTransportFootprint(): TransportFootprint;
  updateTransportFootprint(footprint: TransportFootprint): void;

  fetchFoodFootprint(): FoodFootprint;
  updateFoodFootprint(footprint: FoodFootprint): void;

  fetchHousingFootprint(): HousingFootprint;
  updateHousingFootprint(footprint: HousingFootprint): void;

  fetchEverydayThingsFootprint(): EverydayThingsFootprint;
  updateEverydayThingsFootprint(footprint: EverydayThingsFootprint): void;

  fetchSocietalServicesFootprint(): SocietalServicesFootprint;
  updateSocietalServicesFootprint(footprint: SocietalServicesFootprint): void;
}
