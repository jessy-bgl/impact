import { Transport } from "../../domain/models/transport/Transport";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";

export class EmissionsInMemoryRepository implements EmissionsRepository {
  private transport: Transport = new Transport({});

  fetchTransport(): Transport {
    return this.transport;
  }

  updateTransport(transport: Transport): void {
    this.transport = new Transport(transport);
  }

  injectData(transport: Transport): void {
    this.transport = new Transport(transport);
  }
}
