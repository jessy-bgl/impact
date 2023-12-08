import {
  defaultNumberOfInhabitants,
  defaultLivingSpace,
} from "@domain/models/housing/constants";
import {
  bioGasSurface,
  carbonBasedBioGasEmissionFactor,
  carbonBasedGasEmissionFactor,
  carbonBasedHeatNetworkEmissionFactor,
  carbonBasedWoodLogsEmissionFactor,
  carbonBasedWoodPelletsEmissionFactor,
  defaultHeatingEnergies,
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
  woodSurface,
} from "@domain/models/housing/energy/constants";
import { HeatingEnergies } from "@domain/models/housing/energy/types";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  inhabitants?: number;
  livingSpace?: number;
  annualElectricityConsumption?: number;
  heatingEnergies?: HeatingEnergies;
};

export class Energy implements WithAnnualFootprint {
  inhabitants: number;
  livingSpace: number;
  annualElectricityConsumption: number; // kWh
  heatingEnergies: HeatingEnergies;

  constructor({
    annualElectricityConsumption,
    heatingEnergies,
    inhabitants,
    livingSpace,
  }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.livingSpace = livingSpace ?? defaultLivingSpace;
    this.annualElectricityConsumption = annualElectricityConsumption ?? 0; // TODO
    this.heatingEnergies = heatingEnergies ?? defaultHeatingEnergies;
  }

  public get annualFootprint(): number {
    return 0;
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
