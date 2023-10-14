import { FootprintByCategory } from "../models/transport/car/FootprintCategories";

export interface EmissionsRepository {
  fetchFootprintByCategory(): FootprintByCategory[];
}
