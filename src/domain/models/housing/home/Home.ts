import {
  defaultLivingSpace,
  defaultNumberOfInhabitants,
  isAnApartmentDefaultValue,
} from "@domain/models/housing/constants";
import {
  defaultAgeInYears,
  depreciationPeriodInYears,
  footprintByLivingSpace,
} from "@domain/models/housing/home/constants";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  inhabitants?: number;
  livingSpace?: number;
  isAnApartment?: boolean;
  ageInYears?: number;
  isEcoBuilt?: boolean;
};

export class Home implements WithAnnualFootprint {
  inhabitants: number;
  livingSpace: number;
  isAnApartment: boolean;
  ageInYears: number;
  isEcoBuilt: boolean;

  constructor({
    inhabitants,
    livingSpace,
    isAnApartment,
    ageInYears,
    isEcoBuilt,
  }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.livingSpace = livingSpace ?? defaultLivingSpace;
    this.isAnApartment = isAnApartment ?? isAnApartmentDefaultValue;
    this.ageInYears = ageInYears ?? defaultAgeInYears;
    this.isEcoBuilt = isEcoBuilt ?? false;
  }

  public get annualFootprint(): number {
    return Math.round(this.constructionAnnualFootprint);
  }

  private get constructionAnnualFootprint(): number {
    if (this.ageInYears >= depreciationPeriodInYears) return 0;
    return (
      (this.livingSpace * this.constructionAnnualFootprintPerSquareMeter) /
      this.inhabitants
    );
  }

  private get constructionAnnualFootprintPerSquareMeter(): number {
    return footprintByLivingSpace(this) / depreciationPeriodInYears;
  }
}
