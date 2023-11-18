import {
  wasteCompostingBonus,
  householdWasteFootprint,
  noFoodWasteBonus,
  recyclingCenterFootprint,
  separateCollectionFootprint,
  stopAdvertisingStickerBonus,
  zeroWasteFootprint,
} from "./constants";
import { WithAnnualFootprint } from "../../transport/types";

export type WasteQuantity = "base" | "reduction" | "zero";
export const WasteQuantities: WasteQuantity[] = ["base", "reduction", "zero"];

export type WasteBonus =
  | "wasteComposting"
  | "noFoodWaste"
  | "stopAdvertisingSticker";
export const WasteBonuses: WasteBonus[] = [
  "wasteComposting",
  "noFoodWaste",
  "stopAdvertisingSticker",
];

// eslint-disable-next-line @typescript-eslint/no-redeclare
type WasteBonuses = Record<WasteBonus, boolean>;

type Props = {
  quantity?: WasteQuantity;
  wasteBonuses?: WasteBonuses;
};

export class Waste implements WithAnnualFootprint {
  quantity: WasteQuantity;
  wasteBonuses: WasteBonuses;

  constructor({ quantity, wasteBonuses }: Props) {
    this.quantity = quantity ?? "base";
    this.wasteBonuses = wasteBonuses ?? {
      noFoodWaste: false,
      stopAdvertisingSticker: false,
      wasteComposting: false,
    };
  }

  public get annualFootprint(): number {
    if (this.quantity === "zero") return zeroWasteFootprint;
    else return this.wasteFootprint;
  }

  private get wasteFootprint(): number {
    const defaultFootprint =
      householdWasteFootprint +
      separateCollectionFootprint +
      recyclingCenterFootprint;

    if (this.quantity === "reduction")
      return defaultFootprint + this.wasteBonus;

    return defaultFootprint;
  }

  private get wasteBonus(): number {
    const { noFoodWaste, stopAdvertisingSticker, wasteComposting } =
      this.wasteBonuses;
    let footprintBonus = 0;
    if (noFoodWaste) footprintBonus += noFoodWasteBonus;
    if (stopAdvertisingSticker) footprintBonus += stopAdvertisingStickerBonus;
    if (wasteComposting) footprintBonus += wasteCompostingBonus;
    return footprintBonus;
  }
}
