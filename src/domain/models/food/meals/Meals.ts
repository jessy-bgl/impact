import {
  lunchesAndDinersPerWeekByProfile,
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
  MilkType,
  LunchesAndDinersPerWeek,
  Frequency,
  MealProfile,
  Diets,
  Diet,
} from "./types";
import { daysInYear, weeksInYear } from "../../constants";
import { WithAnnualFootprint } from "../../transport/types";

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

  public setMealProfile(mealProfile: MealProfile): void {
    this.lunchesAndDinersPerWeek =
      lunchesAndDinersPerWeekByProfile(mealProfile);
  }

  private get lunchesAndDinersWeeklyFootprint(): number {
    let weeklyFootprint = 0;
    for (const diet in Diets) {
      let mealFootprint = 0;
      let mealFootprintReduction = 0;
      if (diet === "vegan") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[diet as Diet] * veganMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.12 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (diet === "vegetarian") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[diet as Diet] * vegetarianMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.08 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (diet === "whiteMeat") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[diet as Diet] * whiteMeatMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.03 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (diet === "redMeat") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[diet as Diet] * redMeatMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.01 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (diet === "fish") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[diet as Diet] * fishMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.05 *
          localProductsFootprintReductionRate(this.localProducts);
      } else if (diet === "whiteFish") {
        mealFootprint =
          this.lunchesAndDinersPerWeek[diet as Diet] * whiteFishMealFootprint;
        mealFootprintReduction =
          mealFootprint *
          0.06 *
          localProductsFootprintReductionRate(this.localProducts);
      }
      weeklyFootprint += mealFootprint - mealFootprintReduction;
    }
    return weeklyFootprint;
  }

  private get lunchesAndDinersAnnualFootprint(): number {
    return this.lunchesAndDinersWeeklyFootprint * weeksInYear;
  }

  private get breakfastFootprint(): number {
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

  private get breakfastAnnualFootprint(): number {
    return this.breakfastFootprint * daysInYear;
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
