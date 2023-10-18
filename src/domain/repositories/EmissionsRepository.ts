import { Transport } from "../models/transport/Transport";

export interface EmissionsRepository {
  fetchTransport(): Transport;
  updateTransport(transport: Transport): void;
}
