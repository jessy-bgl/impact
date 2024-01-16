import {
  HeatingEnergies,
  WoodType,
} from "@domain/entities/housing/energy/types";
import { WithAnnualFootprint } from "@domain/entities/types";
import {
  defaultNumberOfOccupants,
  defaultLivingSpace,
  isAnApartmentDefaultValue,
} from "@domain/entities/housing/constants";
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
} from "./constants";

export const HeatingEnergiesLabels: (keyof HeatingEnergies)[] = [
  "electricity",
  "heatPump",
  "gas",
  "gasCylinder",
  "propane",
  "bioGas",
  "fuel",
  "wood",
  "heatNetwork",
];

export const WoodTypes: WoodType[] = ["logs", "pellets"];

type Props = {
  occupants?: number;
  livingSpace?: number;
  isAnApartment?: boolean;
  annualElectricityConsumption?: number; // kWh
  heatingEnergies?: HeatingEnergies;
  airConditioners?: number;
  woodType?: WoodType;
};

export class Energy implements WithAnnualFootprint {
  occupants: number;
  livingSpace: number;
  annualElectricityConsumption: number; // kWh
  heatingEnergies: HeatingEnergies;
  airConditioners: number;
  isAnApartment: boolean;
  woodType: WoodType;

  constructor({
    annualElectricityConsumption,
    heatingEnergies,
    occupants,
    livingSpace,
    airConditioners,
    isAnApartment,
    woodType,
  }: Props) {
    this.occupants = occupants ?? defaultNumberOfOccupants;
    this.livingSpace = livingSpace ?? defaultLivingSpace;
    this.heatingEnergies = heatingEnergies ?? defaultHeatingEnergies;
    this.woodType = woodType ?? "logs";
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
        this.occupants,
    );
  }

  private get defaultElectricityAnnualkWhConsumption(): number {
    if (this.noHeating)
      return Math.round(
        this.livingSpace *
          (electricityWithoutHeating.consuptionPerSquareMeter +
            surfaces.electricityPart * electricity.consumption.perSquareMeter),
      );
    else if (
      this.heatingEnergies.electricity ||
      this.heatingEnergies.heatPump
    ) {
      return Math.round(
        this.livingSpace *
          (electricityWithoutHeating.consuptionPerSquareMeter +
            electricity.consumption.perSquareMeter),
      );
    } else {
      return Math.round(
        this.livingSpace * electricityWithoutHeating.consuptionPerSquareMeter,
      );
    }
  }

  public get airConditioningAnnualFootprint(): number {
    return Math.round(this.airConditionersFootprint / this.occupants);
  }

  private get airConditionersFootprint(): number {
    if (this.airConditioners === 0) return 0;
    return this.airConditioners * airConditioner.footprint.total;
  }

  // NB : calcul utilisé par défaut sur le simulateur nosgestesclimat
  // lorsqu'aucune valeur n'a été renseignée par l'utilisateur.
  // Non utilisé ici car nous utilisons des valeurs par défaut.
  /*private get defaultAirConditioningAnnualFootprint(): number {
    return (
      (this.isAnApartment
        ? airConditioner.defaultNumber.apartment
        : airConditioner.defaultNumber.house) * airConditioner.footprint.all
    );
  }*/

  private get noHeating(): boolean {
    return !Object.values(this.heatingEnergies).some((energy) => energy);
  }

  public get heatingAnnualFootprint(): number {
    return Math.round(
      (this.noHeating
        ? 0
        : this.gasAnnualFootprint +
          this.gasCylinderAnnualFootprint +
          this.propaneAnnualFootprint +
          this.fuelAnnualFootprint +
          this.woodAnnualFootprint +
          this.heatNetworkAnnualFootprint) / this.occupants,
    );
  }

  // NB : calcul utilisé par défaut sur le simulateur nosgestesclimat
  // lorsqu'aucune valeur n'a été renseignée par l'utilisateur.
  // Non utilisé ici car nous utilisons des valeurs par défaut.
  /*private get defaultHeatingAnnualFootprint(): number {
    const averageFootprintPerSquareMeterWithoutElectricity =
      gas.footprintPerSquareMeter +
      fuel.footprintPerSquareMeter +
      wood.logFootprintPerSquareMeter / 2 +
      wood.pelletFootprintPerSquareMeter / 2 +
      heatNetwork.footprintPerSquareMeter +
      bioGas.footprintPerSquareMeter;
    return averageFootprintPerSquareMeterWithoutElectricity * this.livingSpace;
  }*/

  private get gasAnnualFootprint(): number {
    if (!this.heatingEnergies.gas) return 0;
    return (
      this.gasAnnualKWhConsumption *
      (this.heatingEnergies.bioGas
        ? bioGas.emissionFactor
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
    if (this.woodType === "logs") return this.woodLogAnnualFootprint;
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
