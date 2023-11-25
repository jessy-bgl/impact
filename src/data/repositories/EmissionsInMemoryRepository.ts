import { Food } from "@domain/models/food/Food";
import { PublicServices } from "@domain/models/public-services/PublicServices";
import { Transport } from "@domain/models/transport/Transport";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export class EmissionsInMemoryRepository implements EmissionsRepository {
  private transport: Transport = new Transport({});
  private food: Food = new Food({});
  private publicServices: PublicServices = new PublicServices();

  fetchTransport(): Transport {
    return this.transport;
  }

  updateTransport(transport: Transport): void {
    this.transport = new Transport(transport);
  }

  fetchFood(): Food {
    return this.food;
  }

  updateFood(food: Food): void {
    this.food = new Food(food);
  }

  fetchPublicServices(): PublicServices {
    return this.publicServices;
  }

  injectFakeTransport(transport: Transport): void {
    this.transport = new Transport(transport);
  }

  injectFakeFood(food: Food): void {
    this.food = new Food(food);
  }
}
