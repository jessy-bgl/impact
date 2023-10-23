import { Transport } from "../../domain/models/transport/Transport";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";
import { appStoreActions } from "../store/storeActions";

export class EmissionsStoreRepository implements EmissionsRepository {
  fetchTransport(): Transport {
    const storedTransport = appStoreActions.getTransport();

    const transport = new Transport({
      car: storedTransport.car,
      // TODO : ajouter les autres catégories
    });

    return transport;
  }
  updateTransport(transport: Transport): void {
    return appStoreActions.setTransport(transport);
  }
}