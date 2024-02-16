import { EverydayThings } from "@domain/entities/categories/everyday-things/EverydayThings";
import { Food } from "@domain/entities/categories/food/Food";
import { Housing } from "@domain/entities/categories/housing/Housing";
import { PublicServices } from "@domain/entities/categories/public-services/PublicServices";
import { Transport } from "@domain/entities/categories/transport/Transport";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export class EmissionsInMemoryRepository implements EmissionsRepository {
  private transport: Transport = new Transport({});
  private food: Food = new Food({});
  private housing: Housing = new Housing({});
  private everydayThings: EverydayThings = new EverydayThings({});
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

  fetchHousing(): Housing {
    return this.housing;
  }

  updateHousing(housing: Housing): void {
    this.housing = new Housing(housing);
  }

  fetchEverydayThings(): EverydayThings {
    return this.everydayThings;
  }

  updateEverydayThings(everydayThings: EverydayThings): void {
    this.everydayThings = new EverydayThings(everydayThings);
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

  injectFakeHousing(housing: Housing): void {
    this.housing = new Housing(housing);
  }

  injectFakeEverydayThings(everydayThings: EverydayThings): void {
    this.everydayThings = new EverydayThings(everydayThings);
  }
}
