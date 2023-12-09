import {
  defaultNumberOfInhabitants,
  defaultLivingSpace,
} from "@domain/models/housing/constants";
import {
  bioGasSurface,
  butaneFootprint,
  carbonBasedBioGasEmissionFactor,
  carbonBasedGasEmissionFactor,
  carbonBasedHeatNetworkEmissionFactor,
  carbonBasedWoodLogsEmissionFactor,
  carbonBasedWoodPelletsEmissionFactor,
  cookingGasConsumption,
  defaultHeatingEnergies,
  carbonBasedFuelEmissionFactor,
  fuelSurface,
  gasCylinderCapacity,
  gasCylinderEnergyPerBottle,
  propaneEnergyPerKg,
  gasSurface,
  heatNetworkSurface,
  propaneFootprint,
  woodSurface,
  fuelConsumptionPerLiter,
  carbonBasedFuelEmissionFactorPerLiter,
  woodLogEnergyIntensity,
  bioGasConsumptionPerSquareMeter,
  fuelConsumptionPerSquareMeter,
  gasConsumptionPerSquareMeter,
  heatNetworkConsumptionPerSquareMeter,
  woodConsumptionPerSquareMeter,
} from "@domain/models/housing/energy/constants";
import { HeatingEnergies } from "@domain/models/housing/energy/types";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  inhabitants?: number;
  livingSpace?: number;
  annualElectricityConsumption?: number; // kWh
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
    return (
      (this.noHeating
        ? this.heatingAnnualFootprintWithoutHeating
        : this.heatingAnnualFootprint) / this.inhabitants
    ); // TODO : + electricity + air cooling
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
      (gasConsumptionPerSquareMeter * carbonBasedGasEmissionFactor)
    );
  }

  private get fuelFootprintPerSquareMeter(): number {
    return (
      (fuelSurface / this.livingSpace) *
      (fuelConsumptionPerSquareMeter * carbonBasedFuelEmissionFactor)
    );
  }

  private get woodLogFootprintPerSquareMeter(): number {
    return (
      (woodSurface / this.livingSpace) *
      (woodConsumptionPerSquareMeter * carbonBasedWoodLogsEmissionFactor)
    );
  }

  private get woodPelletFootprintPerSquareMeter(): number {
    return (
      (woodSurface / this.livingSpace) *
      (woodConsumptionPerSquareMeter * carbonBasedWoodPelletsEmissionFactor)
    );
  }

  private get heatNetworkFootprintPerSquareMeter(): number {
    return (
      (heatNetworkSurface / this.livingSpace) *
      (heatNetworkConsumptionPerSquareMeter *
        carbonBasedHeatNetworkEmissionFactor)
    );
  }

  private get bioGasFootprintPerSquareMeter(): number {
    return (
      (bioGasSurface / this.livingSpace) *
      (bioGasConsumptionPerSquareMeter * carbonBasedBioGasEmissionFactor)
    );
  }

  private get heatingAnnualFootprint(): number {
    return (
      this.gasAnnualFootprint +
      this.gasCylinderAnnualFootprint +
      this.propaneAnnualFootprint +
      this.fuelAnnualFootprint +
      this.woodAnnualFootprint +
      this.heatNetworkAnnualFootprint
    );
  }

  private get gasAnnualFootprint(): number {
    if (!this.heatingEnergies.gas) return 0;
    return (
      this.gasAnnualKWhConsumption *
      (this.heatingEnergies.bioGas
        ? carbonBasedBioGasEmissionFactor
        : carbonBasedGasEmissionFactor)
    );
  }

  private get gasAnnualKWhConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return gasConsumptionPerSquareMeter * this.livingSpace;
  }

  private get gasCylinderAnnualFootprint(): number {
    if (!this.heatingEnergies.gasCylinder) return 0;
    return this.gasCylinderFootprint * this.gasCylinderAnnualBottleConsumption;
  }

  private get gasCylinderFootprint(): number {
    return ((butaneFootprint + propaneFootprint) / 2) * gasCylinderCapacity;
  }

  private get gasCylinderAnnualBottleConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return (
      ((cookingGasConsumption / gasSurface) * this.livingSpace) /
      gasCylinderEnergyPerBottle
    );
  }

  private get propaneAnnualFootprint(): number {
    if (!this.heatingEnergies.propane) return 0;
    return propaneFootprint * this.propaneAnnualKgConsumption;
  }

  private get propaneAnnualKgConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return (
      (gasConsumptionPerSquareMeter * this.livingSpace) / propaneEnergyPerKg
    );
  }

  private get fuelAnnualFootprint(): number {
    if (!this.heatingEnergies.fuel) return 0;
    return (
      this.fuelAnnualLitersConsumption * carbonBasedFuelEmissionFactorPerLiter
    );
  }

  private get fuelAnnualLitersConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return (
      fuelConsumptionPerSquareMeter * fuelConsumptionPerLiter * this.livingSpace
    );
  }

  private get woodAnnualFootprint(): number {
    if (!this.heatingEnergies.wood) return 0;
    if (this.heatingEnergies.woodType === "logs")
      return this.woodLogAnnualFootprint;
    else return this.woodPelletAnnualFootprint;
  }

  private get woodLogAnnualFootprint(): number {
    return (
      this.woodLogAnnualStereConsumption *
      woodLogEnergyIntensity *
      carbonBasedWoodLogsEmissionFactor
    );
  }

  private get woodLogAnnualStereConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return (
      (woodConsumptionPerSquareMeter * this.livingSpace) /
      woodLogEnergyIntensity
    );
  }

  private get woodPelletAnnualFootprint(): number {
    return (
      this.woolPelletAnnualkWhConsumption * carbonBasedWoodPelletsEmissionFactor
    );
  }

  private get woolPelletAnnualkWhConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return woodConsumptionPerSquareMeter * this.livingSpace;
  }

  private get heatNetworkAnnualFootprint(): number {
    if (!this.heatingEnergies.heatNetwork) return 0;
    return (
      this.heatNetworkAnnualkWhConsumption *
      carbonBasedHeatNetworkEmissionFactor
    );
  }

  private get heatNetworkAnnualkWhConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return heatNetworkConsumptionPerSquareMeter * this.livingSpace;
  }
}
