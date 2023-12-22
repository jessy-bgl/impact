import { EverydayThings } from "@domain/models/everyday-things/EverydayThings";
import { Food } from "@domain/models/food/Food";
import { Housing } from "@domain/models/housing/Housing";
import { PublicServices } from "@domain/models/public-services/PublicServices";
import { Transport } from "@domain/models/transport/Transport";

export interface EmissionsRepository {
  fetchTransport(): Transport;
  updateTransport(transport: Transport): void;

  fetchFood(): Food;
  updateFood(food: Food): void;

  fetchHousing(): Housing;
  updateHousing(housing: Housing): void;

  fetchEverydayThings(): EverydayThings;
  updateEverydayThings(everydayThings: EverydayThings): void;

  fetchPublicServices(): PublicServices;
}
