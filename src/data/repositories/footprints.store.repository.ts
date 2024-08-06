import { appStoreActions } from "@data/store/storeActions";
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
}
