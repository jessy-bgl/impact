import { Preservation } from "@domain/models/everyday-things/types";
import { WithAnnualFootprint } from "@domain/models/types";
import { defaultNumberOfInhabitants } from "@domain/models/housing/constants";
import { daysInYear } from "@domain/models/constants";
import {
  bluetoothSpeaker,
  camera,
  defaultInternetDailyHours,
  defaultLaptops,
  defaultMobilePhones,
  defaultTelevisions,
  desktopComputer,
  gamingConsole,
  homeCinema,
  internetHourlyFootprint,
  laptop,
  mobilePhone,
  portableConsole,
  preservationCoefficient,
  smartWatch,
  tablet,
  television,
  videoProjector,
  vocalSpeaker,
} from "./constants";

type Props = {
  inhabitants?: number;
  preservation?: Preservation;
  internetDailyHours?: number;
  mobilePhones?: number;
  televisions?: number;
  laptops?: number;
  desktopComputers?: number;
  tablets?: number;
  videoProjectors?: number;
  cameras?: number;
  homeCinemas?: number;
  bluetoothSpeakers?: number;
  vocalSpeakers?: number;
  smartWatches?: number;
  gamingConsoles?: number;
  portableConsoles?: number;
};

export class Digital implements WithAnnualFootprint {
  inhabitants: number;
  preservation: Preservation;
  internetDailyHours: number;
  mobilePhones: number;
  televisions: number;
  laptops: number;
  desktopComputers: number;
  tablets: number;
  videoProjectors: number;
  cameras: number;
  homeCinemas: number;
  bluetoothSpeakers: number;
  vocalSpeakers: number;
  smartWatches: number;
  gamingConsoles: number;
  portableConsoles: number;

  constructor({
    inhabitants,
    preservation,
    internetDailyHours,
    mobilePhones,
    televisions,
    laptops,
    desktopComputers,
    tablets,
    videoProjectors,
    cameras,
    homeCinemas,
    bluetoothSpeakers,
    vocalSpeakers,
    smartWatches,
    gamingConsoles,
    portableConsoles,
  }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.preservation = preservation ?? "medium";
    this.internetDailyHours = internetDailyHours ?? defaultInternetDailyHours;
    this.mobilePhones = mobilePhones ?? defaultMobilePhones;
    this.televisions = televisions ?? defaultTelevisions;
    this.laptops = laptops ?? defaultLaptops;
    this.desktopComputers = desktopComputers ?? 0;
    this.tablets = tablets ?? 0;
    this.videoProjectors = videoProjectors ?? 0;
    this.cameras = cameras ?? 0;
    this.homeCinemas = homeCinemas ?? 0;
    this.bluetoothSpeakers = bluetoothSpeakers ?? 0;
    this.vocalSpeakers = vocalSpeakers ?? 0;
    this.smartWatches = smartWatches ?? 0;
    this.gamingConsoles = gamingConsoles ?? 0;
    this.portableConsoles = portableConsoles ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.internetAnnualFootprint +
        this.mobilePhonesAnnualFootprint +
        this.televisionsAnnualFootprint +
        this.laptopsAnnualFootprint +
        this.desktopComputersAnnualFootprint +
        this.tabletsAnnualFootprint +
        this.videoProjectorsAnnualFootprint +
        this.camerasAnnualFootprint +
        this.homeCinemasAnnualFootprint +
        this.bluetoothSpeakersAnnualFootprint +
        this.vocalSpeakersAnnualFootprint +
        this.smartWatchesAnnualFootprint +
        this.gamingConsolesAnnualFootprint +
        this.portableConsolesAnnualFootprint,
    );
  }

  public get internetAnnualFootprint(): number {
    return Number(
      (internetHourlyFootprint * this.internetDailyHours * daysInYear).toFixed(
        2,
      ),
    );
  }

  private get mobilePhonesAnnualFootprint(): number {
    return (
      this.mobilePhones *
      (mobilePhone.footprint /
        (mobilePhone.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get televisionsAnnualFootprint(): number {
    return (
      (this.televisions *
        (television.footprint /
          (television.lifetimeInYears *
            preservationCoefficient(this.preservation)))) /
      this.inhabitants
    );
  }

  private get laptopsAnnualFootprint(): number {
    return (
      this.laptops *
      (laptop.footprint /
        (laptop.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get desktopComputersAnnualFootprint(): number {
    return (
      (this.desktopComputers *
        (desktopComputer.footprint /
          (desktopComputer.lifetimeInYears *
            preservationCoefficient(this.preservation)))) /
      this.inhabitants
    );
  }

  private get tabletsAnnualFootprint(): number {
    return (
      this.tablets *
      (tablet.footprint /
        (tablet.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get videoProjectorsAnnualFootprint(): number {
    return (
      (this.videoProjectors *
        (videoProjector.footprint /
          (videoProjector.lifetimeInYears *
            preservationCoefficient(this.preservation)))) /
      this.inhabitants
    );
  }

  private get camerasAnnualFootprint(): number {
    return (
      this.cameras *
      (camera.footprint /
        (camera.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get homeCinemasAnnualFootprint(): number {
    return (
      (this.homeCinemas *
        (homeCinema.footprint /
          (homeCinema.lifetimeInYears *
            preservationCoefficient(this.preservation)))) /
      this.inhabitants
    );
  }

  private get bluetoothSpeakersAnnualFootprint(): number {
    return (
      this.bluetoothSpeakers *
      (bluetoothSpeaker.footprint /
        (bluetoothSpeaker.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get vocalSpeakersAnnualFootprint(): number {
    return (
      (this.vocalSpeakers *
        (vocalSpeaker.footprint /
          (vocalSpeaker.lifetimeInYears *
            preservationCoefficient(this.preservation)))) /
      this.inhabitants
    );
  }

  private get smartWatchesAnnualFootprint(): number {
    return (
      this.smartWatches *
      (smartWatch.footprint /
        (smartWatch.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get gamingConsolesAnnualFootprint(): number {
    return (
      (this.gamingConsoles *
        (gamingConsole.footprint /
          (gamingConsole.lifetimeInYears *
            preservationCoefficient(this.preservation)))) /
      this.inhabitants
    );
  }

  private get portableConsolesAnnualFootprint(): number {
    return (
      this.portableConsoles *
      (portableConsole.footprint /
        (portableConsole.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }
}
