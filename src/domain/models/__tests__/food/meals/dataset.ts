import {
  Diet,
  Frequency,
  BreakfastType,
} from "@domain/models/food/meals/types";
import { MilkType } from "@domain/models/food/types";

export const lunchesAndDinersDataset: {
  diet: Diet;
  localProducts: Frequency;
  expectedWeeklyFootprint: number;
}[] = [
  { diet: "vegan", localProducts: "never", expectedWeeklyFootprint: 10.99 },
  { diet: "vegan", localProducts: "sometimes", expectedWeeklyFootprint: 10.55 },
  { diet: "vegan", localProducts: "often", expectedWeeklyFootprint: 10.12 },
  { diet: "vegan", localProducts: "always", expectedWeeklyFootprint: 9.67 },

  {
    diet: "vegetarian",
    localProducts: "never",
    expectedWeeklyFootprint: 14.62,
  },
  {
    diet: "vegetarian",
    localProducts: "sometimes",
    expectedWeeklyFootprint: 14.2,
  },
  {
    diet: "vegetarian",
    localProducts: "often",
    expectedWeeklyFootprint: 13.79,
  },
  {
    diet: "vegetarian",
    localProducts: "always",
    expectedWeeklyFootprint: 13.36,
  },

  {
    diet: "littleMeatConsumer",
    localProducts: "never",
    expectedWeeklyFootprint: 20.98,
  },
  {
    diet: "littleMeatConsumer",
    localProducts: "sometimes",
    expectedWeeklyFootprint: 20.59,
  },
  {
    diet: "littleMeatConsumer",
    localProducts: "often",
    expectedWeeklyFootprint: 20.19,
  },
  {
    diet: "littleMeatConsumer",
    localProducts: "always",
    expectedWeeklyFootprint: 19.79,
  },

  {
    diet: "regularMeatConsumer",
    localProducts: "never",
    expectedWeeklyFootprint: 32.07,
  },
  {
    diet: "regularMeatConsumer",
    localProducts: "sometimes",
    expectedWeeklyFootprint: 31.71,
  },
  {
    diet: "regularMeatConsumer",
    localProducts: "often",
    expectedWeeklyFootprint: 31.36,
  },
  {
    diet: "regularMeatConsumer",
    localProducts: "always",
    expectedWeeklyFootprint: 31,
  },

  {
    diet: "heavyMeatConsumer",
    localProducts: "never",
    expectedWeeklyFootprint: 49.65,
  },
  {
    diet: "heavyMeatConsumer",
    localProducts: "sometimes",
    expectedWeeklyFootprint: 49.34,
  },
  {
    diet: "heavyMeatConsumer",
    localProducts: "often",
    expectedWeeklyFootprint: 49.03,
  },
  {
    diet: "heavyMeatConsumer",
    localProducts: "always",
    expectedWeeklyFootprint: 48.71,
  },
];

export const breakfastDataset: {
  type: BreakfastType;
  expectedFootprint: number;
  milkType?: MilkType;
}[] = [
  { type: "none", expectedFootprint: 0 },
  { type: "continental", expectedFootprint: 0.289 },
  { type: "milk & cereals", milkType: "cow", expectedFootprint: 0.468 },
  { type: "milk & cereals", milkType: "oat", expectedFootprint: 0.312 },
  { type: "milk & cereals", milkType: "soy", expectedFootprint: 0.292 },
  { type: "british", expectedFootprint: 1.124 },
  { type: "vegan", expectedFootprint: 0.419 },
];
