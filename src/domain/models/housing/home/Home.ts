import {
  defaultAgeInYears,
  defaultLivingSpace,
  defaultNumberOfInhabitants,
  depreciationPeriodInYears,
  footprintByLivingSpace,
  poolChemicalTreatmentFootprint,
  poolColdWaterFootprint,
  poolConstructionFootprint,
} from "@domain/models/housing/home/constants";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  inhabitants?: number;
  livingSpace?: number;
  isAnApartment?: boolean;
  ageInYears?: number;
  isEcoBuilt?: boolean;
  hasIngroundPool?: boolean;
  poolSize?: number;
};

export class Home implements WithAnnualFootprint {
  inhabitants: number;
  livingSpace: number;
  isAnApartment: boolean;
  ageInYears: number;
  isEcoBuilt: boolean;
  hasIngroundPool: boolean;
  poolSize: number;

  constructor({
    inhabitants,
    livingSpace,
    isAnApartment,
    ageInYears,
    isEcoBuilt,
  }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.livingSpace = livingSpace ?? defaultLivingSpace;
    this.isAnApartment = isAnApartment ?? true;
    this.ageInYears = ageInYears ?? defaultAgeInYears;
    this.isEcoBuilt = isEcoBuilt ?? false;
    this.hasIngroundPool = false;
    this.poolSize = 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.constructionAnnualFootprint + this.poolAnnualFootprint,
      // this.electricityAnnualFootprint +
      // this.heatingAnnualFootprint +
      // this.airConditioningAnnualFootprint +
      // this.holidaysAnnualFootprint,
    );
  }

  private get constructionAnnualFootprint(): number {
    if (this.ageInYears >= depreciationPeriodInYears) return 0;
    return (
      (this.livingSpace * this.annualConstructionFootprintPerSquareMeter) /
      this.inhabitants
    );
  }

  private get annualConstructionFootprintPerSquareMeter(): number {
    return footprintByLivingSpace(this) / depreciationPeriodInYears;
  }

  private get poolAnnualFootprint(): number {
    if (!this.hasIngroundPool) return 0;
    return this.poolFootprint / this.inhabitants;
  }

  private get poolFootprint(): number {
    return (
      poolColdWaterFootprint +
      poolChemicalTreatmentFootprint +
      poolConstructionFootprint
    );
  }
}
