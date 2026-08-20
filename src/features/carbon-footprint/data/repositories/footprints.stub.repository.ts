import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { Footprints } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";

export class FootprintsStubRepository implements FootprintsRepository {
  transport: TransportFootprint = new TransportFootprint({});
  food: FoodFootprint = new FoodFootprint({});
  housing: HousingFootprint = new HousingFootprint({});
  everydayThings: EverydayThingsFootprint = new EverydayThingsFootprint({});
  societalServices: SocietalServicesFootprint = new SocietalServicesFootprint(
    {},
  );

  fetchFootprints(): Footprints {
    return {
      transport: this.transport,
      food: this.food,
      housing: this.housing,
      everydayThings: this.everydayThings,
      societalServices: this.societalServices,
    };
  }

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
