import {
  bioGasSurface,
  carbonBasedBioGasEmissionFactor,
  carbonBasedGasEmissionFactor,
  carbonBasedHeatNetworkEmissionFactor,
  carbonBasedWoodLogsEmissionFactor,
  carbonBasedWoodPelletsEmissionFactor,
  defaultAgeInYears,
  defaultHeatingEnergies,
  defaultLivingSpace,
  defaultNumberOfInhabitants,
  depreciationPeriodInYears,
  footprintByLivingSpace,
  fuelCarbonEmissionFactor,
  fuelSurface,
  gasConsumptionPerSquareMeter,
  gasSurface,
  heatNetworkSurface,
  heatingBioGasConsumption,
  heatingFuelConsumption,
  heatingHeatNetworkConsumption,
  heatingWoodConsumption,
  hotWaterBioGasConsumption,
  hotWaterFuelConsumption,
  hotWaterHeatNetworkConsumption,
  hotWaterWoodConsumption,
  poolChemicalTreatmentFootprint,
  poolColdWaterFootprint,
  poolConstructionFootprint,
  woodSurface,
} from "@domain/models/housing/home/constants";
import { HeatingEnergies } from "@domain/models/housing/home/types";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  inhabitants?: number;
  livingSpace?: number;
  isAnApartment?: boolean;
  ageInYears?: number;
  isEcoBuilt?: boolean;
  hasIngroundPool?: boolean;
  poolSize?: number;
  annualElectricityConsumption?: number;
  heatingEnergies?: HeatingEnergies;
};

export class Home implements WithAnnualFootprint {
  inhabitants: number;
  livingSpace: number;
  isAnApartment: boolean;
  ageInYears: number;
  isEcoBuilt: boolean;
  hasIngroundPool: boolean;
  poolSize: number;
  annualElectricityConsumption: number; // kWh
  heatingEnergies: HeatingEnergies;

  constructor({
    inhabitants,
    livingSpace,
    isAnApartment,
    ageInYears,
    isEcoBuilt,
    annualElectricityConsumption,
    heatingEnergies,
  }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.livingSpace = livingSpace ?? defaultLivingSpace;
    this.isAnApartment = isAnApartment ?? true;
    this.ageInYears = ageInYears ?? defaultAgeInYears;
    this.isEcoBuilt = isEcoBuilt ?? false;
    this.hasIngroundPool = false;
    this.poolSize = 0;
    this.annualElectricityConsumption = annualElectricityConsumption ?? 0; // TODO
    this.heatingEnergies = heatingEnergies ?? defaultHeatingEnergies;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.constructionAnnualFootprint + this.poolAnnualFootprint,
      // this.heatingAnnualFootprint +
      // this.electricityAnnualFootprint +
      // this.airConditioningAnnualFootprint +
      // this.holidaysAnnualFootprint,
    );
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

  private get heatingAnnualFootprint(): number {
    if (this.noHeating)
      return this.heatingAnnualFootprintWithoutHeating / this.inhabitants;
    // return this.heatingAnnualFootprint / this.inhabitants;
    return 0; // TODO
  }

  private get noHeating(): boolean {
    return !Object.values(this.heatingEnergies).some((energy) => energy);
  }

  private get heatingAnnualFootprintWithoutHeating(): number {
    const averageFootprintPerSquareMeterWithoutElectricity =
      this.gasFootprintPerSquareMeter +
      this.fuelFootprintPerSquareMeter +
      this.woodLogFootprintPerSquareMeter / 2 +
      this.woodPelletFootprintPerSquareMeter / 2 +
      this.heatNetworkFootprintPerSquareMeter +
      this.bioGasFootprintPerSquareMeter;

    return averageFootprintPerSquareMeterWithoutElectricity * this.livingSpace;
  }

  private get gasFootprintPerSquareMeter(): number {
    return (
      (gasSurface / this.livingSpace) *
      (this.gasConsumptionPerSquareMeter * carbonBasedGasEmissionFactor)
    );
  }

  private get gasConsumptionPerSquareMeter(): number {
    return gasConsumptionPerSquareMeter;
  }

  private get fuelFootprintPerSquareMeter(): number {
    return (
      (fuelSurface / this.livingSpace) *
      (this.fuelConsumptionPerSquareMeter * fuelCarbonEmissionFactor)
    );
  }

  private get fuelConsumptionPerSquareMeter(): number {
    const fuelConsumption = heatingFuelConsumption + hotWaterFuelConsumption;
    return fuelConsumption / fuelSurface;
  }

  private get woodLogFootprintPerSquareMeter(): number {
    return (
      (woodSurface / this.livingSpace) *
      (this.woodConsumptionPerSquareMeter * carbonBasedWoodLogsEmissionFactor)
    );
  }

  private get woodPelletFootprintPerSquareMeter(): number {
    return (
      (woodSurface / this.livingSpace) *
      (this.woodConsumptionPerSquareMeter *
        carbonBasedWoodPelletsEmissionFactor)
    );
  }

  private get woodConsumptionPerSquareMeter(): number {
    const woodConsumption = heatingWoodConsumption + hotWaterWoodConsumption;
    return woodConsumption / woodSurface;
  }

  private get heatNetworkFootprintPerSquareMeter(): number {
    return (
      (heatNetworkSurface / this.livingSpace) *
      (this.heatNetworkConsumptionPerSquareMeter *
        carbonBasedHeatNetworkEmissionFactor)
    );
  }

  private get heatNetworkConsumptionPerSquareMeter(): number {
    const heatNetworkConsumption =
      heatingHeatNetworkConsumption + hotWaterHeatNetworkConsumption;
    return heatNetworkConsumption / heatNetworkSurface;
  }

  private get bioGasFootprintPerSquareMeter(): number {
    return (
      (bioGasSurface / this.livingSpace) *
      (this.bioGasConsumptionPerSquareMeter * carbonBasedBioGasEmissionFactor)
    );
  }

  private get bioGasConsumptionPerSquareMeter(): number {
    const bioGasConsumption =
      heatingBioGasConsumption + hotWaterBioGasConsumption;
    return bioGasConsumption / bioGasSurface;
  }
}
