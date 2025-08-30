import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";

export interface WithAnnualFootprint {
  annualFootprint: number;
}

export type Footprints = {
  transport: TransportFootprint;
  food: FoodFootprint;
  housing: HousingFootprint;
  everydayThings: EverydayThingsFootprint;
  societalServices: SocietalServicesFootprint;
};

export type FootprintCategory =
  | "transport"
  | "housing"
  | "food"
  | "everydayThings"
  | "societalServices";

export type TransportFootprintSubCategory =
  | "boat"
  | "car"
  | "otherTransport"
  | "plane"
  | "publicTransport"
  | "twoWheeler";

export type FoodFootprintSubCategory = "drinks" | "meals" | "waste";

export type HousingFootprintSubCategory = "energy" | "home" | "leisure";

export type EverydayThingsFootprintSubCategory =
  | "clothes"
  | "consumableProducts"
  | "digital"
  | "furniture"
  | "hobbies"
  | "householdAppliances"
  | "otherProducts"
  | "pets"
  | "tobacco";

export type SocietalServicesFootprintSubCategory =
  | "publicServices"
  | "merchantServices";

export type FootprintSubCategory =
  | TransportFootprintSubCategory
  | FoodFootprintSubCategory
  | HousingFootprintSubCategory
  | EverydayThingsFootprintSubCategory
  | SocietalServicesFootprintSubCategory;
