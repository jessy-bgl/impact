import { breakfastDataset, lunchesAndDinersDataset } from "./dataset";
import { Meals } from "../../../food/meals/Meals";
import { lunchesAndDinersPerWeekByDiet } from "../../../food/meals/constants";
import {
  Frequency,
  Diet,
  Diets,
  BreakfastType,
} from "../../../food/meals/types";

describe("Meals", () => {
  describe("setDiet - lunches and diners per week by diet", () => {
    it.each<Diet>(Diets)(
      "should update lunchesAndDinersPerWeek with %s diet default values " +
        "and a total of 14 meals when calling 'setDiet' method",
      (diet) => {
        const meal = new Meals({});
        meal.setDiet(diet);
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
        const meals = new Meals({
          localProducts,
          lunchesAndDinersPerWeek: lunchesAndDinersPerWeekByDiet(diet),
        });
        expect(meals.lunchesAndDinersWeeklyFootprint).toEqual(
          expectedWeeklyFootprint,
        );
      },
    );
  });

  describe("breakfast footprint", () => {
    it.each<[number, BreakfastType]>(
      breakfastDataset.map(({ expectedFootprint, type }) => [
        expectedFootprint,
        type,
      ]),
    )(
      "should give a footprint equal to %d kgCO2e for a %s breakfast",
      (expectedFootprint, breakfastType) => {
        const meals = new Meals({ breakfast: breakfastType });
        expect(meals.breakfastFootprint).toEqual(expectedFootprint);
      },
    );
  });

  describe("annual footprint", () => {
    const meals = new Meals({
      breakfast: "continental",
      localProducts: "never",
    });
    meals.setDiet("regularMeatConsumer");

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
