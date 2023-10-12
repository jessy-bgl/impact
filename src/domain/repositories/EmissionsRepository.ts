import { EmissionsByCategory } from "../models/transport/car/EmissionCategories";

export interface EmissionsRepository {
  fetchEmissionsByCategory(): EmissionsByCategory[];
}
