import { Footprints } from "../../domain/models/Footprint";
import { EmissionsRepository } from "../../domain/repositories/EmissionsRepository";
import { appStoreActions } from "../store/storeActions";

export class EmissionsRepositoryStore implements EmissionsRepository {
  fetchFootprints(): Footprints {
    return appStoreActions.getFootprintPerCategory();
  }
}
