import { Food } from "../models/food/Food";
import { PublicServices } from "../models/public-services/PublicServices";
import { Transport } from "../models/transport/Transport";

export interface EmissionsRepository {
  fetchTransport(): Transport;
  updateTransport(transport: Transport): void;
  fetchFood(): Food;
  updateFood(food: Food): void;
  fetchPublicServices(): PublicServices;
}
