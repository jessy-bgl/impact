import { Action } from "@domain/entities/actions/Action";
import { TwoWheeler } from "@domain/entities/categories/transport/two-wheeler/TwoWheeler";
import i18n from "@view/translations/i18n";

export class ChangeForElectricScooterAction extends Action {
  constructor(private twoWheeler: TwoWheeler) {
    super({
      id: "change-for-electric-scooter",
      label: i18n.t("transportActions:changeForElectricScooter.label"),
      description: i18n.t(
        "transportActions:changeForElectricScooter.description",
      ),
      category: "transport",
    });
  }

  get isCompleted(): boolean {
    return (
      !this.twoWheeler.usage ||
      this.twoWheeler.kmPerYear === 0 ||
      this.twoWheeler.type === "electricScooter"
    );
  }

  computeSavedFootprint(): void {
    if (this.isCompleted) {
      this.savedFootprint = 0;
      return;
    }

    const currentFootprint = this.twoWheeler.annualFootprint;

    const electricScooterFootprint = new TwoWheeler({
      ...this.twoWheeler,
      type: "electricScooter",
    }).annualFootprint;

    this.savedFootprint = Math.floor(
      currentFootprint - electricScooterFootprint,
    );
  }
}
