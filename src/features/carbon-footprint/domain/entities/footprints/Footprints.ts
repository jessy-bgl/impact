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
  "transport" | "housing" | "food" | "everydayThings" | "societalServices";

/**
 * Declaration order of the categories, as a `Record` so that adding one to the
 * union stops compiling here instead of silently dropping it from everything
 * that iterates the categories.
 */
const footprintCategoryOrder: Record<FootprintCategory, null> = {
  transport: null,
  food: null,
  housing: null,
  everydayThings: null,
  societalServices: null,
};

export const footprintCategories = Object.keys(
  footprintCategoryOrder,
) as FootprintCategory[];

export type TransportFootprintSubCategory =
  "car" | "otherTransport" | "plane" | "publicTransport" | "twoWheeler";

export type FoodFootprintSubCategory = "drinks" | "meals" | "waste";

export type HousingFootprintSubCategory = "energy" | "home" | "leisure";

export type EverydayThingsFootprintSubCategory =
  | "clothes"
  | "digital"
  | "furniture"
  | "hobbies"
  | "householdAppliances"
  | "pets"
  | "tobacco";

export type SocietalServicesFootprintSubCategory =
  "publicServices" | "merchantServices";

export type FootprintSubCategory =
  | TransportFootprintSubCategory
  | FoodFootprintSubCategory
  | HousingFootprintSubCategory
  | EverydayThingsFootprintSubCategory
  | SocietalServicesFootprintSubCategory;
