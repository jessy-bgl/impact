import { Food } from "../../domain/models/food/Food";
import { PublicServices } from "../../domain/models/public-services/PublicServices";
import { Transport } from "../../domain/models/transport/Transport";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";
import { appStoreActions } from "../store/storeActions";

export class EmissionsStoreRepository implements EmissionsRepository {
  fetchTransport(): Transport {
    const storedTransport = appStoreActions.getTransport();
    const transport = new Transport({
      car: storedTransport.car,
      twoWheeler: storedTransport.twoWheeler,
      plane: storedTransport.plane,
      boat: storedTransport.boat,
      publicTransport: storedTransport.publicTransport,
      // TODO : ajouter les autres catégories
    });
    return transport;
  }

  updateTransport(transport: Transport): void {
    return appStoreActions.setTransport(transport);
  }

  fetchFood(): Food {
    const storedFood = appStoreActions.getFood();
    const food = new Food({
      meals: storedFood.meals,
      drinks: storedFood.drinks,
      waste: storedFood.waste,
    });
    return food;
  }

  updateFood(food: Food): void {
    return appStoreActions.setFood(food);
  }

  fetchPublicServices(): PublicServices {
    const publicServices = new PublicServices();
    return publicServices;
  }
}
