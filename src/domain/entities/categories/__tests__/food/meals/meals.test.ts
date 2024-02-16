import { Meals } from "@domain/entities/categories/food/meals/Meals";
import { lunchesAndDinersPerWeekByDiet } from "@domain/entities/categories/food/meals/constants";
import {
  BreakfastType,
  Diet,
  Diets,
  Frequency,
} from "@domain/entities/categories/food/meals/types";
import { MilkType } from "@domain/entities/categories/food/types";
import { breakfastDataset, lunchesAndDinersDataset } from "./dataset";

describe("Meals", () => {
  describe("setDiet - lunches and diners per week by diet", () => {
    it.each<Diet>(Diets)(
      "should set lunchesAndDinersPerWeek according to %s diet " +
        "and the a total of meals per week should be 14",
      (diet) => {
        const meal = new Meals({ diet });
        expect(meal.lunchesAndDinersPerWeek).toEqual(
          lunchesAndDinersPerWeekByDiet(diet),
        );
        const sumOfMeals = Object.values(meal.lunchesAndDinersPerWeek).reduce(
          (acc, value) => acc + value,
          0,
        );
        expect(sumOfMeals).toBe(14);
      },
    );
  });

  describe("lunches and diners weekly footprint", () => {
    it.each<[number, Diet, Frequency]>(
      lunchesAndDinersDataset.map(
        ({ expectedWeeklyFootprint, diet, localProducts }) => [
          expectedWeeklyFootprint,
          diet,
          localProducts,
        ],
      ),
    )(
      `should give a weekly footprint equal to %i kgCO2e for a %s diet with a frequency of local products consommation of "%s"`,
      (expectedWeeklyFootprint, diet, localProducts) => {
        const meals = new Meals({ localProducts, diet });
        expect(meals.lunchesAndDinersWeeklyFootprint).toEqual(
          expectedWeeklyFootprint,
        );
      },
    );
  });

  describe("breakfast footprint", () => {
    it.each<[number, BreakfastType, MilkType]>(
      breakfastDataset.map(({ expectedFootprint, type, milkType = "cow" }) => [
        expectedFootprint,
        type,
        milkType,
      ]),
    )(
      "should give a footprint equal to %d kgCO2e for a %s breakfast and %s milk",
      (expectedFootprint, breakfastType, milkType) => {
        const meals = new Meals({ breakfast: breakfastType, milkType });
        expect(meals.breakfastFootprint).toEqual(expectedFootprint);
      },
    );
  });

  describe("annual footprint", () => {
    const meals = new Meals({
      breakfast: "continental",
      localProducts: "never",
      diet: "regularMeatConsumer",
    });

    it.each<[number, Frequency]>([
      [1773, "never"],
      [1754, "sometimes"],
      [1735, "often"],
      [1716, "always"],
    ])(
      "should give an annual footprint equal to %i kgCO2e with a frequency of seasonal products consommation of '%s'",
      (expectedFootprint, seasonalProducts) => {
        meals.seasonalProducts = seasonalProducts;
        expect(meals.annualFootprint).toEqual(expectedFootprint);
      },
    );
  });
});
