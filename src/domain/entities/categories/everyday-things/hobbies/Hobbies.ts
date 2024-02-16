import { WithAnnualFootprint } from "@domain/entities/categories/types";
import {
  concertsAndShowsAnnualFootprint,
  distributedSportAnnualFootprint,
  editionsAnnualFootprint,
  fitnessAnnualFootprint,
  mountainAnnualFootprint,
  museumsAndMonumentsAnnualFootprint,
  musicAnnualFootprint,
  sportClubAnnualFootprint,
} from "./constants";

type Props = {
  concertsAndShows?: boolean;
  museumsAndMonuments?: boolean;
  editions?: boolean;
  music?: boolean;
  outdoorIndividualSport?: boolean;
  ballSport?: boolean;
  waterSport?: boolean;
  swimming?: boolean;
  martialSport?: boolean;
  athletics?: boolean;
  gym?: boolean;
  riding?: boolean;
  golf?: boolean;
  winterSport?: boolean;
  motorSport?: boolean;
  otherSport?: boolean;
};

export class Hobbies implements WithAnnualFootprint {
  concertsAndShows: boolean;
  museumsAndMonuments: boolean;
  editions: boolean;
  music: boolean;
  outdoorIndividualSport: boolean;
  ballSport: boolean;
  waterSport: boolean;
  swimming: boolean;
  martialSport: boolean;
  athletics: boolean;
  gym: boolean;
  riding: boolean;
  golf: boolean;
  winterSport: boolean;
  motorSport: boolean;
  otherSport: boolean;

  constructor({
    concertsAndShows,
    museumsAndMonuments,
    editions,
    music,
    outdoorIndividualSport,
    ballSport,
    waterSport,
    swimming,
    martialSport,
    athletics,
    gym,
    riding,
    golf,
    winterSport,
    motorSport,
    otherSport,
  }: Props) {
    this.concertsAndShows = concertsAndShows ?? false;
    this.museumsAndMonuments = museumsAndMonuments ?? false;
    this.editions = editions ?? false;
    this.music = music ?? false;
    this.outdoorIndividualSport = outdoorIndividualSport ?? false;
    this.ballSport = ballSport ?? false;
    this.waterSport = waterSport ?? false;
    this.swimming = swimming ?? false;
    this.martialSport = martialSport ?? false;
    this.athletics = athletics ?? false;
    this.gym = gym ?? false;
    this.riding = riding ?? false;
    this.golf = golf ?? false;
    this.winterSport = winterSport ?? false;
    this.motorSport = motorSport ?? false;
    this.otherSport = otherSport ?? false;
  }

  public get annualFootprint(): number {
    return Math.round(this.sportAnnualFootprint + this.cultureAnnualFootprint);
  }

  // NB : sur le simulateur nosgestesclimat, un calcul par défaut
  // est utilisé lorsqu'aucune valeur n'a été renseignée par l'utilisateur.
  // Nous ne l'utilisons pas ici car chaque variable a une valeur par défaut.

  public get cultureAnnualFootprint(): number {
    return Number(
      (
        this.concertsAndShowsAnnualFootprint +
        this.museumsAndMonumentsAnnualFootprint +
        this.editionsAnnualFootprint +
        this.musicAnnualFootprint
      ).toFixed(2),
    );
  }

  private get concertsAndShowsAnnualFootprint(): number {
    if (!this.concertsAndShows) return 0;
    return concertsAndShowsAnnualFootprint;
  }

  private get museumsAndMonumentsAnnualFootprint(): number {
    if (!this.museumsAndMonuments) return 0;
    return museumsAndMonumentsAnnualFootprint;
  }

  private get editionsAnnualFootprint(): number {
    if (!this.editions) return 0;
    return editionsAnnualFootprint;
  }

  private get musicAnnualFootprint(): number {
    if (!this.music) return 0;
    return musicAnnualFootprint;
  }

  public get sportAnnualFootprint(): number {
    return Number(
      (
        this.distributedSportAnnualFootprint +
        this.sportClubAnnualFootprint +
        this.fitnessAnnualFootprint +
        this.mountainAnnualFootprint
      ).toFixed(2),
    );
  }

  private get distributedSportAnnualFootprint(): number {
    if (
      this.ballSport ||
      this.waterSport ||
      this.martialSport ||
      this.athletics ||
      this.riding ||
      this.golf ||
      this.winterSport ||
      this.otherSport ||
      this.swimming ||
      this.motorSport ||
      this.outdoorIndividualSport ||
      this.gym
    )
      return Number(distributedSportAnnualFootprint.toFixed(2));
    return 0;
  }

  private get sportClubAnnualFootprint(): number {
    if (
      this.ballSport ||
      this.waterSport ||
      this.martialSport ||
      this.athletics ||
      this.riding ||
      this.golf ||
      this.winterSport ||
      this.otherSport ||
      this.waterSport ||
      this.motorSport
    ) {
      return Number(sportClubAnnualFootprint.toFixed(2));
    }
    return 0;
  }

  private get fitnessAnnualFootprint(): number {
    if (!this.gym) return 0;
    return Number(fitnessAnnualFootprint.toFixed(2));
  }

  private get mountainAnnualFootprint(): number {
    if (!this.winterSport) return 0;
    return Number(mountainAnnualFootprint.toFixed(2));
  }
}
