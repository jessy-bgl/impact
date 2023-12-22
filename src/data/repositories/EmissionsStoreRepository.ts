import { Food } from "@domain/models/food/Food";
import { PublicServices } from "@domain/models/public-services/PublicServices";
import { Transport } from "@domain/models/transport/Transport";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";
import { appStoreActions } from "@data/store/storeActions";
import { Housing } from "@domain/models/housing/Housing";
import { EverydayThings } from "@domain/models/everyday-things/EverydayThings";

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
