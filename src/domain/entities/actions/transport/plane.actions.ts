import { Action } from "@domain/entities/actions/Action";
import { Plane } from "@domain/entities/categories/transport/plane/Plane";
import { averagePlaneSpeed } from "@domain/entities/categories/transport/plane/constants";
import { averageTrainFootprintPerKm } from "@domain/entities/categories/transport/public-transport/constants";
import i18n from "@view/translations/i18n";

export class StopShortHaulFlightsAction extends Action {
  constructor(private plane: Plane) {
    super({
      id: "stop-short-haul-flights",
      label: i18n.t("transportActions:stopShortHaulFlights.label"),
      description: i18n.t("transportActions:stopShortHaulFlights.description"),
      category: "transport",
    });
  }

  get isCompleted(): boolean {
    return this.plane.hoursPerYearInShortHaul === 0;
  }

  computeSavedFootprint(): void {
    if (this.isCompleted) {
      this.savedFootprint = 0;
      return;
    }

    const planeFootprint = new Plane({
      usage: true,
      hoursPerYearInShortHaul: this.plane.hoursPerYearInShortHaul,
      hoursPerYearInMediumHaul: 0,
      hoursPerYearInLongHaul: 0,
    }).annualFootprint;

    const trainRate = 1.2;

    const trainCompensationFootprint =
      this.plane.hoursPerYearInShortHaul *
      averagePlaneSpeed["short"] *
      trainRate *
      averageTrainFootprintPerKm;

    this.savedFootprint = Math.floor(
      planeFootprint - trainCompensationFootprint,
    );
  }
}

export class StopFlightAction extends Action {
  constructor(private plane: Plane) {
    super({
      id: "stop-flight",
      label: i18n.t("transportActions:stopFlight.label"),
      description: i18n.t("transportActions:stopFlight.description"),
      category: "transport",
    });
  }

  get isCompleted(): boolean {
    return this.plane.usage === false;
  }

  computeSavedFootprint(): void {
    if (this.isCompleted) {
      this.savedFootprint = 0;
      return;
    }
    const footprint = new Plane(this.plane).annualFootprint;
    this.savedFootprint = Math.floor(footprint);
  }
}

export class TakeFlightHalfAsMuchAction {}
