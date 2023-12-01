import { Drinks } from "@domain/models/food/drinks/Drinks";
import { Meals } from "@domain/models/food/meals/Meals";
import { Waste } from "@domain/models/food/waste/Waste";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  meals?: Meals;
  drinks?: Drinks;
  waste?: Waste;
};

export class Food implements WithAnnualFootprint {
  meals: Meals;
  drinks: Drinks;
  waste: Waste;

  constructor({ meals, drinks, waste }: Props) {
    this.meals = new Meals(meals ?? {});
    this.drinks = new Drinks(drinks ?? {});
    this.waste = new Waste(waste ?? {});
  }

  public get annualFootprint(): number {
    return Math.round(
      this.meals.annualFootprint +
        this.drinks.annualFootprint +
        this.waste.annualFootprint,
    );
  }
}
