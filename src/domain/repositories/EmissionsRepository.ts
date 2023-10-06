import { EmissionsByCategory } from "../models/EmissionCategories";

export interface EmissionsRepository {
  fetchEmissionsByCategory(): EmissionsByCategory[];
}
