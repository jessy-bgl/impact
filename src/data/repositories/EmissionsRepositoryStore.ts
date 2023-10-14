import { FootprintByCategory } from "../../domain/models/transport/car/FootprintCategories";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";
import { appStoreActions } from "../store/storeActions";

export class EmissionsRepositoryStore implements EmissionsRepository {
  fetchFootprintByCategory(): FootprintByCategory[] {
    return appStoreActions.getFootprintPerCategory();
  }
}
