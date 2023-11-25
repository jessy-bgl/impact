import { Food } from "@domain/models/food/Food";
import { PublicServices } from "@domain/models/public-services/PublicServices";
import { Transport } from "@domain/models/transport/Transport";

export interface EmissionsRepository {
  fetchTransport(): Transport;
  updateTransport(transport: Transport): void;
  fetchFood(): Food;
  updateFood(food: Food): void;
  fetchPublicServices(): PublicServices;
}
