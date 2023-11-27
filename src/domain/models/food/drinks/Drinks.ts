import {
  alcoholDrinkCoef,
  bottledWaterAnnualFootprint,
  cupOfChocolateFootprint,
  cupOfCoffeeFootprint,
  cupOfTeaFootprint,
  defaultHotDrinksPerWeek,
  sweetDrinkCoef,
} from "./constants";
import { weeksInYear } from "../../constants";
import { WithAnnualFootprint } from "../../types";
import { MilkType } from "../types";

export type HotDrink = "coffee" | "tea" | "chocolate";
export const HotDrinks: HotDrink[] = ["coffee", "tea", "chocolate"];

export type HotDrinksPerWeek = Record<HotDrink, number>;

type Props = {
  hotDrinksPerWeek?: HotDrinksPerWeek;
  bottledWater?: boolean;
  sodaLitersPerWeek?: number;
  alcoholLitersPerWeek?: number;
  milkType?: MilkType;
};

export class Drinks implements WithAnnualFootprint {
  hotDrinksPerWeek: HotDrinksPerWeek;
  bottledWater: boolean;
  sodaLitersPerWeek: number;
  alcoholLitersPerWeek: number;
  milkType: MilkType;

  constructor({
    hotDrinksPerWeek,
    bottledWater,
    sodaLitersPerWeek,
    alcoholLitersPerWeek,
    milkType,
  }: Props) {
    this.hotDrinksPerWeek = hotDrinksPerWeek ?? defaultHotDrinksPerWeek;
    this.bottledWater = bottledWater ?? true;
    this.sodaLitersPerWeek = sodaLitersPerWeek ?? 0;
    this.alcoholLitersPerWeek = alcoholLitersPerWeek ?? 0;
    this.milkType = milkType ?? "cow";
  }

  public get annualFootprint(): number {
    return Math.round(
      this.hotDrinksAnnualFootprint + this.coldDrinksAnnualFootprint,
    );
  }

  private get hotDrinksAnnualFootprint(): number {
    return (
      this.coffeeAnnualFootprint +
      this.teaAnnualFootprint +
      this.chocolateAnnualFootprint
    );
  }

  private get coffeeAnnualFootprint(): number {
    return this.hotDrinksPerWeek.coffee * weeksInYear * cupOfCoffeeFootprint;
  }

  private get teaAnnualFootprint(): number {
    return this.hotDrinksPerWeek.tea * weeksInYear * cupOfTeaFootprint;
  }

  private get chocolateAnnualFootprint(): number {
    return (
      this.hotDrinksPerWeek.chocolate *
      weeksInYear *
      cupOfChocolateFootprint(this.milkType)
    );
  }

  private get coldDrinksAnnualFootprint(): number {
    return (
      this.bottledWaterAnnualFootprint +
      this.sodaAnnualFootprint +
      this.alcoholAnnualFootprint
    );
  }

  private get bottledWaterAnnualFootprint(): number {
    if (!this.bottledWater) return 0;
    return bottledWaterAnnualFootprint;
  }

  private get sodaAnnualFootprint(): number {
    return this.sodaLitersPerWeek * weeksInYear * sweetDrinkCoef;
  }

  private get alcoholAnnualFootprint(): number {
    return this.alcoholLitersPerWeek * weeksInYear * alcoholDrinkCoef;
  }
}
