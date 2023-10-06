import {
  EmissionCategories,
  EmissionsByCategory,
} from "../../domain/models/EmissionCategories";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";

export class EmissionsRepositoryStore implements EmissionsRepository {
  fetchEmissionsByCategory(): EmissionsByCategory[] {
    const emissionCategories = [
      new EmissionsByCategory(EmissionCategories.TRANSPORT, 2000, 20),
      new EmissionsByCategory(EmissionCategories.FOOD, 2000, 20),
      new EmissionsByCategory(EmissionCategories.HOUSING, 2000, 20),
      new EmissionsByCategory(EmissionCategories.GOODS, 2000, 20),
      new EmissionsByCategory(EmissionCategories.NUMERIC, 2000, 20),
    ];
    return emissionCategories;
  }
}
