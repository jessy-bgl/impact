import { EverydayThings } from "@domain/entities/categories/everyday-things/EverydayThings";
import { Food } from "@domain/entities/categories/food/Food";
import { Housing } from "@domain/entities/categories/housing/Housing";
import { PublicServices } from "@domain/entities/categories/public-services/PublicServices";
import { Transport } from "@domain/entities/categories/transport/Transport";

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
