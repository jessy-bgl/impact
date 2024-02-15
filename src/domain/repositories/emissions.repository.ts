import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { Food } from "@domain/entities/food/Food";
import { Housing } from "@domain/entities/housing/Housing";
import { PublicServices } from "@domain/entities/public-services/PublicServices";
import { Transport } from "@domain/entities/transport/Transport";

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
