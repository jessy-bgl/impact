import { appStoreActions } from "@data/store/storeActions";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { Food } from "@domain/entities/food/Food";
import { Housing } from "@domain/entities/housing/Housing";
import { PublicServices } from "@domain/entities/public-services/PublicServices";
import { Transport } from "@domain/entities/transport/Transport";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export class EmissionsStoreRepository implements EmissionsRepository {
  fetchTransport(): Transport {
    const storedTransport = appStoreActions.getTransport();
    return new Transport(storedTransport);
  }

  updateTransport(transport: Transport): void {
    return appStoreActions.setTransport(transport);
  }

  fetchFood(): Food {
    const storedFood = appStoreActions.getFood();
    return new Food(storedFood);
  }

  updateFood(food: Food): void {
    return appStoreActions.setFood(food);
  }

  fetchHousing(): Housing {
    const storedHousing = appStoreActions.getHousing();
    return new Housing(storedHousing);
  }

  updateHousing(housing: Housing): void {
    return appStoreActions.setHousing(housing);
  }

  fetchEverydayThings(): EverydayThings {
    const storedEverydayThings = appStoreActions.getEverydayThings();
    return new EverydayThings(storedEverydayThings);
  }

  updateEverydayThings(everydayThings: EverydayThings): void {
    return appStoreActions.setEverydayThings(everydayThings);
  }

  fetchPublicServices(): PublicServices {
    const publicServices = new PublicServices();
    return publicServices;
  }
}
