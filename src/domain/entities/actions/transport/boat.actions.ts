import { Action } from "@domain/entities/actions/Action";
import { Boat } from "@domain/entities/categories/transport/boat/Boat";
import i18n from "@view/translations/i18n";

export class StopFerryAction extends Action {
  constructor(private ferry: Boat) {
    super({
      id: "stop-ferry",
      label: i18n.t("transportActions:stopFerry.label"),
      description: i18n.t("transportActions:stopFerry.description"),
      category: "transport",
    });
  }

  get isCompleted(): boolean {
    return this.ferry.usage === false || this.ferry.hoursPerYear === 0;
  }

  computeSavedFootprint(): void {
    if (this.isCompleted) {
      this.savedFootprint = 0;
      return;
    }
    this.savedFootprint = Math.floor(this.ferry.annualFootprint);
  }
}

export class TakeFerryHalfAsMuchAction extends Action {
  constructor(private ferry: Boat) {
    super({
      id: "take-ferry-half-as-much",
      label: i18n.t("transportActions:takeFerryHalfAsMuch.label"),
      description: i18n.t("transportActions:takeFerryHalfAsMuch.description"),
      category: "transport",
    });
  }

  get isCompleted(): boolean {
    return this.ferry.usage === false || this.ferry.hoursPerYear === 0;
  }

  computeSavedFootprint(): void {
    if (this.isCompleted) {
      this.savedFootprint = 0;
      return;
    }
    this.savedFootprint = Math.floor(this.ferry.annualFootprint / 2);
  }
}
