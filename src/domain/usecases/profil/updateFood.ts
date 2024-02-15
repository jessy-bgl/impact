import { Drinks } from "@domain/entities/food/drinks/Drinks";
import { Meals } from "@domain/entities/food/meals/Meals";
import { Waste } from "@domain/entities/food/waste/Waste";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export const createUseUpdateFood = (emissionsRepository: EmissionsRepository) =>
  function useUpdateFood() {
    const updateMeals = (values: Meals) => {
      const newMeals = new Meals(values);

      const newFood = emissionsRepository.fetchFood();
      newFood.meals = newMeals;

      emissionsRepository.updateFood(newFood);
    };

    const updateDrinks = (values: Drinks) => {
      const newDrinks = new Drinks(values);

      const newFood = emissionsRepository.fetchFood();
      newFood.drinks = newDrinks;

      emissionsRepository.updateFood(newFood);
    };

    const updateWaste = (values: Waste) => {
      const newWaste = new Waste(values);

      const newFood = emissionsRepository.fetchFood();
      newFood.waste = newWaste;

      emissionsRepository.updateFood(newFood);
    };

    return {
      updateMeals,
      updateDrinks,
      updateWaste,
    };
  };
