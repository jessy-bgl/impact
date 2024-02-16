import { weeksInYear } from "@domain/entities/categories/constants";
import { WithAnnualFootprint } from "@domain/entities/categories/types";
import {
  averageBusFootprintPerHour,
  averageMetroFootprintPerHour,
  averageTrainFootprintPerKm,
  defaultHoursPerYearInTrain,
} from "./constants";

type Props = {
  hoursPerYearInTrain?: number;
  hoursPerWeekInMetro?: number;
  hoursPerWeekInBus?: number;
};

export class PublicTransport implements WithAnnualFootprint {
  hoursPerYearInTrain: number;
  hoursPerWeekInMetro: number;
  hoursPerWeekInBus: number;

  constructor({
    hoursPerYearInTrain = defaultHoursPerYearInTrain,
    hoursPerWeekInMetro = 0,
    hoursPerWeekInBus = 0,
  }: Props) {
    this.hoursPerYearInTrain = hoursPerYearInTrain;
    this.hoursPerWeekInMetro = hoursPerWeekInMetro;
    this.hoursPerWeekInBus = hoursPerWeekInBus;
  }

  private get trainAnnualFootprint(): number {
    return this.hoursPerYearInTrain * averageTrainFootprintPerKm;
  }

  private get metroWeekFootprint(): number {
    return (
      this.hoursPerWeekInMetro * averageMetroFootprintPerHour * weeksInYear
    );
  }

  private get busWeekFootprint(): number {
    return this.hoursPerWeekInBus * averageBusFootprintPerHour * weeksInYear;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.trainAnnualFootprint +
        this.metroWeekFootprint +
        this.busWeekFootprint,
    );
  }
}
