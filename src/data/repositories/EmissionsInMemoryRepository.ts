import { PublicServices } from "../../domain/models/public-services/PublicServices";
import { Transport } from "../../domain/models/transport/Transport";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";

export class EmissionsInMemoryRepository implements EmissionsRepository {
  private transport: Transport = new Transport({});
  private publicServices: PublicServices = new PublicServices();

  fetchTransport(): Transport {
    return this.transport;
  }

  updateTransport(transport: Transport): void {
    this.transport = new Transport(transport);
  }

  fetchPublicServices(): PublicServices {
    return this.publicServices;
  }

  injectFakeTransport(transport: Transport): void {
    this.transport = new Transport(transport);
  }
}
