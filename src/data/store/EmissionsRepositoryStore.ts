import {
  EmissionCategories,
  EmissionsByCategory,
} from "../../domain/models/transport/car/EmissionCategories";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";

export class EmissionsRepositoryStore implements EmissionsRepository {
  fetchEmissionsByCategory(): EmissionsByCategory[] {
    const totalEmissions = 7800;
    const emissionCategories = [
      new EmissionsByCategory(
        EmissionCategories.GOODS,
        1000,
        (1000 / totalEmissions) * 100,
      ),
      new EmissionsByCategory(
        EmissionCategories.TRANSPORT,
        2500,
        (2500 / totalEmissions) * 100,
      ),
      new EmissionsByCategory(
        EmissionCategories.OTHER,
        500,
        (500 / totalEmissions) * 100,
      ),
      new EmissionsByCategory(
        EmissionCategories.FOOD,
        2000,
        (2000 / totalEmissions) * 100,
      ),
      new EmissionsByCategory(
        EmissionCategories.HOUSING,
        2500,
        (2500 / totalEmissions) * 100,
      ),
    ];
    return emissionCategories;
  }
}
