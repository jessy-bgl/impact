import {
  EmissionCategories,
  EmissionsByCategory,
} from "../../domain/models/transport/car/EmissionCategories";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";

export class EmissionsRepositoryStore implements EmissionsRepository {
  fetchEmissionsByCategory(): EmissionsByCategory[] {
    const emissionCategories = [
      new EmissionsByCategory(EmissionCategories.GOODS, 1000, 20),
      new EmissionsByCategory(EmissionCategories.TRANSPORT, 2500, 20),
      new EmissionsByCategory(EmissionCategories.OTHER, 500, 20),
      new EmissionsByCategory(EmissionCategories.FOOD, 2000, 20),
      new EmissionsByCategory(EmissionCategories.HOUSING, 1800, 20),
    ];
    return emissionCategories;
  }
}
