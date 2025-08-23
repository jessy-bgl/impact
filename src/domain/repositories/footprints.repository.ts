import { EverydayThingsFootprint } from "@domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";

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
