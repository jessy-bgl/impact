export type MealType =
  | "vegetarian"
  | "vegan"
  | "whiteMeat"
  | "redMeat"
  | "whiteFish"
  | "fattyFish";

export const MealTypes: MealType[] = [
  "vegetarian",
  "vegan",
  "whiteMeat",
  "redMeat",
  "whiteFish",
  "fattyFish",
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

export type Diet =
  | "vegetarian"
  | "vegan"
  | "littleMeatConsumer"
  | "regularMeatConsumer"
  | "heavyMeatConsumer";

export const Diets: Diet[] = [
  "vegan",
  "vegetarian",
  "littleMeatConsumer",
  "regularMeatConsumer",
  "heavyMeatConsumer",
];

// the total must be equal to 14 (2 meals per day * 7 days)
export type LunchesAndDinersPerWeek = Record<MealType, number>;

export type Frequency = "never" | "sometimes" | "often" | "always";
