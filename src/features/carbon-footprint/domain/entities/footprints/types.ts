export interface WithAnnualFootprint {
  annualFootprint: number;
}

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
