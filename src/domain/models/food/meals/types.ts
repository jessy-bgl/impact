export type Diet =
  | "vegetarian"
  | "vegan"
  | "whiteMeat"
  | "redMeat"
  | "whiteFish"
  | "fish";

export const Diets: Diet[] = [
  "vegetarian",
  "vegan",
  "whiteMeat",
  "redMeat",
  "whiteFish",
  "fish",
];

export type BreakfastType =
  | "continental"
  | "british"
  | "milk & cereals"
  | "vegan"
  | "none";

export const BreakfastTypes: BreakfastType[] = [
  "continental",
  "british",
  "milk & cereals",
  "vegan",
  "none",
];

export type MilkType = "cow" | "soy" | "oat";

export type MealProfile =
  | "vegetarian"
  | "vegan"
  | "littleMeatConsumer"
  | "regularMeatConsumer"
  | "heavyMeatConsumer";

// the total must be equal to 14 (2 meals per day * 7 days)
export type LunchesAndDinersPerWeek = Record<Diet, number>;

export type Frequency = "never" | "sometimes" | "often" | "always";
