import {
  lunchesAndDinersPerWeekByDiet,
  defaultLunchesAndDinersPerWeek,
  veganMealFootprint,
  vegetarianMealFootprint,
  whiteMeatMealFootprint,
  redMeatMealFootprint,
  fishMealFootprint,
  whiteFishMealFootprint,
  continentalBreakfastFootprint,
  britishBreakfastFootprint,
  milkAndCerealsBreakfastFootprint,
  veganBreakfastFootprint,
  seasonalProductsPart,
  seasonalProductsRatio,
  seasonalPercentage,
  localProductsFootprintReductionRate,
} from "./constants";
import {
  BreakfastType,
  LunchesAndDinersPerWeek,
  Frequency,
  Diet,
  MealTypes,
  MealType,
} from "./types";
import { daysInYear, weeksInYear } from "../../constants";
import { WithAnnualFootprint } from "../../transport/types";
import { MilkType } from "../types";

type Props = {
  breakfast?: BreakfastType;
  milkType?: MilkType;
  lunchesAndDinersPerWeek?: LunchesAndDinersPerWeek;
  localProducts?: Frequency;
  seasonalProducts?: Frequency;
};

export class Meals implements WithAnnualFootprint {
  breakfast: BreakfastType;
  milkType?: MilkType;
  lunchesAndDinersPerWeek: LunchesAndDinersPerWeek;
  localProducts: Frequency;
  seasonalProducts: Frequency;

  constructor({
    breakfast,
    milkType,
    lunchesAndDinersPerWeek,
    localProducts,
    seasonalProducts,
  }: Props) {
    this.breakfast = breakfast ?? "continental";

    this.lunchesAndDinersPerWeek =
      lunchesAndDinersPerWeek ?? defaultLunchesAndDinersPerWeek;

    this.localProducts = localProducts ?? "never";

    this.seasonalProducts = seasonalProducts ?? "never";

    if (breakfast === "milk & cereals") this.milkType = milkType ?? "cow";
    else this.milkType = milkType;
  }

  public setDiet(diet: Diet): void {
    this.lunchesAndDinersPerWeek = lunchesAndDinersPerWeekByDiet(diet);
  }

  private get lunchesAndDinersAnnualFootprint(): number {
    return this.lunchesAndDinersWeeklyFootprint * weeksInYear;
  }

  public get lunchesAndDinersWeeklyFootprint(): number {
    let weeklyFootprint = 0;
    for (const mealType of MealTypes) {
      let mealFootprint = 0;
      let mealFootprintReduction = 0;
      if (mealType === "vegan") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[mealType as MealType] *
          veganMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.12 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (mealType === "vegetarian") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[mealType as MealType] *
          vegetarianMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.08 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (mealType === "whiteMeat") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[mealType as MealType] *
          whiteMeatMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.03 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (mealType === "redMeat") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[mealType as MealType] *
          redMeatMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.01 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (mealType === "fattyFish") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[mealType as MealType] *
          fishMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.05 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (mealType === "whiteFish") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[mealType as MealType] *
          whiteFishMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.06 *
          localProductsFootprintReductionRate(this.localProducts);
      }
      weeklyFootprint += mealFootprint - mealFootprintReduction;
    }
    return Number(weeklyFootprint.toFixed(2));
  }

  private get breakfastAnnualFootprint(): number {
    return this.breakfastFootprint * daysInYear;
  }

  public get breakfastFootprint(): number {
    switch (this.breakfast) {
      case "continental": {
        return continentalBreakfastFootprint;
      }
      case "british": {
        return britishBreakfastFootprint;
      }
      case "milk & cereals": {
        return milkAndCerealsBreakfastFootprint(this.milkType ?? "cow");
      }
      case "vegan": {
        return veganBreakfastFootprint;
      }
      case "none": {
        return 0;
      }
      default: {
        return 0;
      }
    }
  }

  private get seasonalProductsAnnualFootprint(): number {
    return this.seasonalFactor * this.seasonPart;
  }

  private get seasonalFactor(): number {
    return (
      (-1 * seasonalProductsPart(this.seasonalProducts)) / seasonalProductsRatio
    );
  }

  private get seasonPart(): number {
    return (
      seasonalPercentage *
      (this.breakfastAnnualFootprint + this.lunchesAndDinersAnnualFootprint)
    );
  }

  public get annualFootprint(): number {
    return Math.round(
      this.lunchesAndDinersAnnualFootprint +
        this.breakfastAnnualFootprint +
        this.seasonalProductsAnnualFootprint,
    );
  }
}
