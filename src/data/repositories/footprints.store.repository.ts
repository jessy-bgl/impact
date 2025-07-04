import { appStoreActions } from "@data/store/storeActions";
import { EverydayThingsFootprint } from "@domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export class FootprintsStoreRepository implements FootprintsRepository {
  fetchTransportFootprint(): TransportFootprint {
    const storedTransport = appStoreActions.getTransportFootprint();
    return new TransportFootprint(storedTransport);
  }

  updateTransportFootprint(footprint: TransportFootprint) {
    return appStoreActions.setTransportFootprint(footprint);
  }

  fetchFoodFootprint() {
    const storedFood = appStoreActions.getFoodFootprint();
    return new FoodFootprint(storedFood);
  }

  updateFoodFootprint(footprint: FoodFootprint) {
    return appStoreActions.setFoodFootprint(footprint);
  }

  fetchHousingFootprint(): HousingFootprint {
    const storedHousing = appStoreActions.getHousingFootprint();
    return new HousingFootprint(storedHousing);
  }

  updateHousingFootprint(footprint: HousingFootprint) {
    return appStoreActions.setHousingFootprint(footprint);
  }

  fetchEverydayThingsFootprint() {
    const storedEverydayThings = appStoreActions.getEverydayThingsFootprint();
    return new EverydayThingsFootprint(storedEverydayThings);
  }

  fetchSocietalServicesFootprint() {
    const storedSocietalServices =
      appStoreActions.getSocietalServicesFootprint();
    return new SocietalServicesFootprint(storedSocietalServices);
  }

  updateEverydayThingsFootprint(footprint: EverydayThingsFootprint) {
    return appStoreActions.setEverydayThingsFootprint(footprint);
  }
}
