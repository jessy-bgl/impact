import { Footprints } from "../models/Footprint";

export interface EmissionsRepository {
  fetchFootprints(): Footprints;
}
