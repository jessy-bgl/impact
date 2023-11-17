import { Meals } from "./meals/Meals";
import { WithAnnualFootprint } from "../transport/types";

type Props = {
  meals?: Meals;
};

// TODO
export class Food implements WithAnnualFootprint {
  meals: Meals;

  constructor({ meals }: Props) {
    this.meals = new Meals(meals ?? {});
  }

  public get annualFootprint(): number {
    return Math.round(this.meals.annualFootprint);
  }
}
