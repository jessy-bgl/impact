import {
  defaultNumberOfInhabitants,
  isAnApartmentDefaultValue,
} from "@domain/models/housing/constants";
import {
  poolColdWaterFootprint,
  poolChemicalTreatmentFootprint,
  poolConstructionFootprint,
} from "@domain/models/housing/leisure/constants";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  hasIngroundPool?: boolean;
  poolSize?: number;
  isAnApartment?: boolean;
  inhabitants?: number;
};

export class Leisure implements WithAnnualFootprint {
  hasIngroundPool: boolean;
  poolSize: number;
  isAnApartment: boolean;
  inhabitants: number;

  constructor({
    hasIngroundPool,
    poolSize,
    isAnApartment,
    inhabitants,
  }: Props) {
    this.hasIngroundPool = hasIngroundPool ?? false;
    this.poolSize = poolSize ?? 0;
    this.isAnApartment = isAnApartment ?? isAnApartmentDefaultValue;
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
  }

  get annualFootprint(): number {
    return this.poolAnnualFootprint; // TODO : + holidays
  }

  private get poolAnnualFootprint(): number {
    if (!this.hasIngroundPool || this.isAnApartment) return 0;
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
