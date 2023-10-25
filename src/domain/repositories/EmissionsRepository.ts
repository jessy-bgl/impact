import { PublicServices } from "../models/public-services/PublicServices";
import { Transport } from "../models/transport/Transport";

export interface EmissionsRepository {
  fetchTransport(): Transport;
  updateTransport(transport: Transport): void;
  fetchPublicServices(): PublicServices;
}
