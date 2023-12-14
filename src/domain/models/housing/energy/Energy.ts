import {
  defaultNumberOfInhabitants,
  defaultLivingSpace,
  isAnApartmentDefaultValue,
} from "@domain/models/housing/constants";
import {
  airConditioner,
  bioGas,
  electricity,
  electricityWithoutHeating,
  defaultHeatingEnergies,
  fuel,
  gas,
  heatNetwork,
  surfaces,
  wood,
} from "@domain/models/housing/energy/constants";
import { HeatingEnergies } from "@domain/models/housing/energy/types";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  inhabitants?: number;
  livingSpace?: number;
  annualElectricityConsumption?: number; // kWh
  heatingEnergies?: HeatingEnergies;
  airConditioners?: number;
  isAnApartment?: boolean;
};

export class Energy implements WithAnnualFootprint {
  inhabitants: number;
  livingSpace: number;
  annualElectricityConsumption: number; // kWh
  heatingEnergies: HeatingEnergies;
  airConditioners: number;
  isAnApartment: boolean;

  constructor({
    annualElectricityConsumption,
    heatingEnergies,
    inhabitants,
    livingSpace,
    airConditioners,
    isAnApartment,
  }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.livingSpace = livingSpace ?? defaultLivingSpace;
    this.heatingEnergies = heatingEnergies ?? defaultHeatingEnergies;
    this.airConditioners = airConditioners ?? 0;
    this.isAnApartment = isAnApartment ?? isAnApartmentDefaultValue;
    this.annualElectricityConsumption =
      annualElectricityConsumption ??
      this.defaultElectricityAnnualkWhConsumption;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.heatingAnnualFootprint +
        this.electricityAnnualFootprint +
        this.airConditioningAnnualFootprint,
    );
  }

  public get electricityAnnualFootprint(): number {
    return Math.round(
      (this.annualElectricityConsumption *
        electricityWithoutHeating.carbonIntensity) /
        this.inhabitants,
    );
  }

  public get defaultElectricityAnnualkWhConsumption(): number {
    if (this.noHeating)
      return (
        this.livingSpace *
        (electricityWithoutHeating.consuptionPerSquareMeter +
          surfaces.electricityPart * electricity.consumption.perSquareMeter)
      );
    else if (
      this.heatingEnergies.electricity ||
      this.heatingEnergies.heatPump
    ) {
      return (
        this.livingSpace *
        (electricityWithoutHeating.consuptionPerSquareMeter +
          electricity.consumption.perSquareMeter)
      );
    } else {
      return (
        this.livingSpace * electricityWithoutHeating.consuptionPerSquareMeter
      );
    }
  }

  public get airConditioningAnnualFootprint(): number {
    return Math.round(this.airConditionersFootprint / this.inhabitants);
  }

  private get airConditionersFootprint(): number {
    if (this.airConditioners > 0) {
      return this.airConditioners * airConditioner.footprint.all;
    }
    return (
      (this.isAnApartment
        ? airConditioner.defaultNumber.apartment
        : airConditioner.defaultNumber.house) * airConditioner.footprint.all
    );
  }

  private get noHeating(): boolean {
    return !Object.values(this.heatingEnergies).some((energy) => energy);
  }

  public get heatingAnnualFootprint(): number {
    return Math.round(
      (this.noHeating
        ? this.defaultHeatingAnnualFootprint
        : this.gasAnnualFootprint +
          this.gasCylinderAnnualFootprint +
          this.propaneAnnualFootprint +
          this.fuelAnnualFootprint +
          this.woodAnnualFootprint +
          this.heatNetworkAnnualFootprint) / this.inhabitants,
    );
  }

  private get defaultHeatingAnnualFootprint(): number {
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
      (surfaces.gas / this.livingSpace) *
      (gas.consumption.perSquareMeter * gas.carbonBasedEmissionFactor)
    );
  }

  private get fuelFootprintPerSquareMeter(): number {
    return (
      (surfaces.fuel / this.livingSpace) *
      (fuel.consumption.perSquareMeter *
        fuel.carbonBasedEmissionFactor.perKiloWattHeure)
    );
  }

  private get woodLogFootprintPerSquareMeter(): number {
    return (
      (surfaces.wood / this.livingSpace) *
      (wood.consumption.perSquareMeter * wood.carbonBasedEmissionFactor.logs)
    );
  }

  private get woodPelletFootprintPerSquareMeter(): number {
    return (
      (surfaces.wood / this.livingSpace) *
      (wood.consumption.perSquareMeter * wood.carbonBasedEmissionFactor.pellets)
    );
  }

  private get heatNetworkFootprintPerSquareMeter(): number {
    return (
      (surfaces.heatNetwork / this.livingSpace) *
      (heatNetwork.consumption.perSquareMeter *
        heatNetwork.carbonBasedEmissionFactor)
    );
  }

  private get bioGasFootprintPerSquareMeter(): number {
    return (
      (surfaces.bioGas / this.livingSpace) *
      (bioGas.consumption.perSquareMeter * bioGas.carbonBasedEmissionFactor)
    );
  }

  private get gasAnnualFootprint(): number {
    if (!this.heatingEnergies.gas) return 0;
    return (
      this.gasAnnualKWhConsumption *
      (this.heatingEnergies.bioGas
        ? bioGas.carbonBasedEmissionFactor
        : gas.carbonBasedEmissionFactor)
    );
  }

  private get gasAnnualKWhConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return gas.consumption.perSquareMeter * this.livingSpace;
  }

  private get gasCylinderAnnualFootprint(): number {
    if (!this.heatingEnergies.gasCylinder) return 0;
    return gas.footprint.cylinder * this.gasCylinderAnnualBottleConsumption;
  }

  private get gasCylinderAnnualBottleConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return (
      ((gas.consumption.cooking / surfaces.gas) * this.livingSpace) /
      gas.energy.cylinderPerBottle
    );
  }

  private get propaneAnnualFootprint(): number {
    if (!this.heatingEnergies.propane) return 0;
    return gas.footprint.propane * this.propaneAnnualKgConsumption;
  }

  private get propaneAnnualKgConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return (
      (gas.consumption.perSquareMeter * this.livingSpace) /
      gas.energy.propanePerKg
    );
  }

  private get fuelAnnualFootprint(): number {
    if (!this.heatingEnergies.fuel) return 0;
    return (
      this.fuelAnnualLitersConsumption * fuel.carbonBasedEmissionFactor.perLiter
    );
  }

  private get fuelAnnualLitersConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return (
      fuel.consumption.perSquareMeter *
      fuel.consumption.perLiter *
      this.livingSpace
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
      wood.consumption.perLog *
      wood.carbonBasedEmissionFactor.logs
    );
  }

  private get woodLogAnnualStereConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return (
      (wood.consumption.perSquareMeter * this.livingSpace) /
      wood.consumption.perLog
    );
  }

  private get woodPelletAnnualFootprint(): number {
    return (
      this.woodPelletAnnualkWhConsumption *
      wood.carbonBasedEmissionFactor.pellets
    );
  }

  private get woodPelletAnnualkWhConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return wood.consumption.perSquareMeter * this.livingSpace;
  }

  private get heatNetworkAnnualFootprint(): number {
    if (!this.heatingEnergies.heatNetwork) return 0;
    return (
      this.heatNetworkAnnualkWhConsumption *
      heatNetwork.carbonBasedEmissionFactor
    );
  }

  private get heatNetworkAnnualkWhConsumption(): number {
    // NB : améliorable en permettant à l'utilisateur de renseigner la valeur de sa consommation réelle
    return heatNetwork.consumption.perSquareMeter * this.livingSpace;
  }
}
