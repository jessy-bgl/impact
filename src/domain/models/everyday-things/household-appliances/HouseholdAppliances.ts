import { WithAnnualFootprint } from "@domain/models/types";
import { Preservation } from "@domain/models/everyday-things/types";
import {
  coffeeMachine,
  dishWasher,
  dryer,
  electricLawnMower,
  freezer,
  fridge,
  hood,
  hotplates,
  kettle,
  kitchenRobot,
  microwaves,
  miniFridge,
  oven,
  preservationCoefficient,
  vacuumCleaner,
  washingMachine,
} from "./constants";

type Props = {
  fridges?: number;
  miniFridges?: number;
  freezers?: number;
  washingMachines?: number;
  dryers?: number;
  dishWashers?: number;
  hoods?: number;
  ovens?: number;
  microwaves?: number;
  hotPlates?: number;
  kettles?: number;
  coffeeMachines?: number;
  vacuumCleaners?: number;
  kitchenRobots?: number;
  electricLawnMowers?: number;
  preservation?: Preservation;
};

export class HouseholdAppliances implements WithAnnualFootprint {
  fridges: number;
  miniFridges: number;
  freezers: number;
  washingMachines: number;
  dryers: number;
  dishWashers: number;
  hoods: number;
  ovens: number;
  microwaves: number;
  hotPlates: number;
  kettles: number;
  coffeeMachines: number;
  vacuumCleaners: number;
  kitchenRobots: number;
  electricLawnMowers: number;
  preservation: Preservation;

  constructor({
    fridges,
    miniFridges,
    freezers,
    washingMachines,
    dryers,
    dishWashers,
    hoods,
    ovens,
    microwaves,
    hotPlates,
    kettles,
    coffeeMachines,
    vacuumCleaners,
    kitchenRobots,
    electricLawnMowers,
    preservation,
  }: Props) {
    this.fridges = fridges ?? 0;
    this.miniFridges = miniFridges ?? 0;
    this.freezers = freezers ?? 0;
    this.washingMachines = washingMachines ?? 0;
    this.dryers = dryers ?? 0;
    this.dishWashers = dishWashers ?? 0;
    this.hoods = hoods ?? 0;
    this.ovens = ovens ?? 0;
    this.microwaves = microwaves ?? 0;
    this.hotPlates = hotPlates ?? 0;
    this.kettles = kettles ?? 0;
    this.coffeeMachines = coffeeMachines ?? 0;
    this.vacuumCleaners = vacuumCleaners ?? 0;
    this.kitchenRobots = kitchenRobots ?? 0;
    this.electricLawnMowers = electricLawnMowers ?? 0;
    this.preservation = preservation ?? "medium";
  }

  public get annualFootprint(): number {
    return Math.round(
      this.fridgesAnnualFootprint +
        this.miniFridgesAnnualFootprint +
        this.freezersAnnualFootprint +
        this.washingMachinesAnnualFootprint +
        this.dryersAnnualFootprint +
        this.dishWashersAnnualFootprint +
        this.hoodsAnnualFootprint +
        this.ovensAnnualFootprint +
        this.microwavesAnnualFootprint +
        this.hotPlatesAnnualFootprint +
        this.kettlesAnnualFootprint +
        this.coffeeMachinesAnnualFootprint +
        this.vacuumCleanersAnnualFootprint +
        this.kitchenRobotsAnnualFootprint +
        this.electricLawnMowersAnnualFootprint,
    );
  }

  private get fridgesAnnualFootprint(): number {
    return (
      this.fridges *
      (fridge.footprint /
        (fridge.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get miniFridgesAnnualFootprint(): number {
    return (
      this.miniFridges *
      (miniFridge.footprint /
        (miniFridge.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get freezersAnnualFootprint(): number {
    return (
      this.freezers *
      (freezer.footprint /
        (freezer.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get washingMachinesAnnualFootprint(): number {
    return (
      this.washingMachines *
      (washingMachine.footprint /
        (washingMachine.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get dryersAnnualFootprint(): number {
    return (
      this.dryers *
      (dryer.footprint /
        (dryer.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get dishWashersAnnualFootprint(): number {
    return (
      this.dishWashers *
      (dishWasher.footprint /
        (dishWasher.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get hoodsAnnualFootprint(): number {
    return (
      this.hoods *
      (hood.footprint /
        (hood.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get ovensAnnualFootprint(): number {
    return (
      this.ovens *
      (oven.footprint /
        (oven.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get microwavesAnnualFootprint(): number {
    return (
      this.microwaves *
      (microwaves.footprint /
        (microwaves.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get hotPlatesAnnualFootprint(): number {
    return (
      this.hotPlates *
      (hotplates.footprint /
        (hotplates.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get kettlesAnnualFootprint(): number {
    return (
      this.kettles *
      (kettle.footprint /
        (kettle.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get coffeeMachinesAnnualFootprint(): number {
    return (
      this.coffeeMachines *
      (coffeeMachine.footprint /
        (coffeeMachine.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get vacuumCleanersAnnualFootprint(): number {
    return (
      this.vacuumCleaners *
      (vacuumCleaner.footprint /
        (vacuumCleaner.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get kitchenRobotsAnnualFootprint(): number {
    return (
      this.kitchenRobots *
      (kitchenRobot.footprint /
        (kitchenRobot.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get electricLawnMowersAnnualFootprint(): number {
    return (
      this.electricLawnMowers *
      (electricLawnMower.footprint /
        (electricLawnMower.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }
}
