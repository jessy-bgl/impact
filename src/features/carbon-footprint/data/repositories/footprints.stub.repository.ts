import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export class FootprintsStubRepository implements FootprintsRepository {
  transport?: TransportFootprint;
  food?: FoodFootprint;
  housing?: HousingFootprint;
  everydayThings?: EverydayThingsFootprint;
  societalServices?: SocietalServicesFootprint;

  updateTransportFootprint(footprint: TransportFootprint): void {
    this.transport = footprint;
  }

  updateFoodFootprint(footprint: FoodFootprint): void {
    this.food = footprint;
  }

  updateHousingFootprint(footprint: HousingFootprint): void {
    this.housing = footprint;
  }

  updateEverydayThingsFootprint(footprint: EverydayThingsFootprint): void {
    this.everydayThings = footprint;
  }

  updateSocietalServicesFootprint(footprint: SocietalServicesFootprint): void {
    this.societalServices = footprint;
  }
}
