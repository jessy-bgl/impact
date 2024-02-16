import {
  defaultLivingSpace,
  defaultNumberOfOccupants,
  isAnApartmentDefaultValue,
} from "@domain/entities/categories/housing/constants";
import {
  defaultAgeInYears,
  depreciationPeriodInYears,
  footprintByLivingSpace,
} from "@domain/entities/categories/housing/home/constants";
import { WithAnnualFootprint } from "@domain/entities/categories/types";

type Props = {
  occupants?: number;
  livingSpace?: number;
  isAnApartment?: boolean;
  ageInYears?: number;
  isEcoBuilt?: boolean;
};

export class Home implements WithAnnualFootprint {
  occupants: number;
  livingSpace: number;
  isAnApartment: boolean;
  ageInYears: number;
  isEcoBuilt: boolean;

  constructor({
    occupants,
    livingSpace,
    isAnApartment,
    ageInYears,
    isEcoBuilt,
  }: Props) {
    this.occupants = occupants ?? defaultNumberOfOccupants;
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
      this.occupants
    );
  }

  private get constructionAnnualFootprintPerSquareMeter(): number {
    return footprintByLivingSpace(this) / depreciationPeriodInYears;
  }
}
