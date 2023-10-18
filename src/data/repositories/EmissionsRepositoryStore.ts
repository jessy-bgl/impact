import { Transport } from "../../domain/models/transport/Transport";
import { Car } from "../../domain/models/transport/car/Car";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";
import { appStoreActions } from "../store/storeActions";

export class EmissionsRepositoryStore implements EmissionsRepository {
  fetchTransport(): Transport {
    const storedTransport = appStoreActions.getTransport();

    const transport = new Transport({
      car: new Car(storedTransport.car),
      // TODO : ajouter les autres catégories
    });

    return transport;
  }
  updateTransport(transport: Transport): void {
    return appStoreActions.setTransport(transport);
  }
}
