import {
  FootprintCategories,
  FootprintByCategory,
} from "../../domain/models/transport/car/FootprintCategories";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";

export class EmissionsRepositoryStore implements EmissionsRepository {
  fetchFootprintByCategory(): FootprintByCategory[] {
    const totalEmissions = 7800;
    const footprintCategories = [
      new FootprintByCategory(
        FootprintCategories.GOODS,
        1000,
        (1000 / totalEmissions) * 100,
      ),
      new FootprintByCategory(
        FootprintCategories.TRANSPORT,
        2500,
        (2500 / totalEmissions) * 100,
      ),
      new FootprintByCategory(
        FootprintCategories.OTHER,
        500,
        (500 / totalEmissions) * 100,
      ),
      new FootprintByCategory(
        FootprintCategories.FOOD,
        2000,
        (2000 / totalEmissions) * 100,
      ),
      new FootprintByCategory(
        FootprintCategories.HOUSING,
        2500,
        (2500 / totalEmissions) * 100,
      ),
    ];
    return footprintCategories;
  }
}
