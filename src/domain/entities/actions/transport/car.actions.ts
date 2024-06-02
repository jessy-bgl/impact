import { Action } from "@domain/entities/actions/Action";
import { Car } from "@domain/entities/categories/transport/car/Car";
import i18n from "@view/translations/i18n";

export class CarSharing extends Action {
  constructor(private car: Car) {
    super({
      id: "car-sharing",
      label: i18n.t("transportActions:carSharing.label"),
      description: i18n.t("transportActions:carSharing.description"),
      category: "transport",
    });
  }

  get isCompleted(): boolean {
    return this.car.regularUser === false || this.car.usage === false;
  }

  get isApplicable(): boolean {
    return this.car.kmPerYear > 7200;
  }

  computeSavedFootprint(): void {
    if (this.isCompleted) {
      this.savedFootprint = 0;
      return;
    }

    // https://presse.ademe.fr/wp-content/uploads/2013/03/ena_4pages_presse_130306.pdf
    const carSharingFootprint = new Car({
      ...this.car,
      kmPerYear: this.car.kmPerYear * 0.41,
    }).annualFootprint;

    this.savedFootprint = Math.floor(
      this.car.annualFootprint - carSharingFootprint,
    );
  }
}

export class UseElectricCar extends Action {
  constructor(private car: Car) {
    super({
      id: "use-electric-car",
      label: i18n.t("transportActions:useElectricCar.label"),
      description: i18n.t("transportActions:useElectricCar.description"),
      category: "transport",
    });
  }

  get isCompleted(): boolean {
    return this.car.engine === "electric";
  }

  get isApplicable(): boolean {
    return this.car.usage && this.car.regularUser;
  }

  computeSavedFootprint(): void {
    if (this.isCompleted) {
      this.savedFootprint = 0;
      return;
    }

    const electricCar = new Car({
      ...this.car,
      engine: "electric",
    });

    this.savedFootprint = Math.floor(
      this.car.annualFootprint - electricCar.annualFootprint,
    );
  }
}
