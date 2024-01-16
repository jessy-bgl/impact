import { WithAnnualFootprint } from "@domain/entities/types";
import {
  bigItemFootprint,
  coatFootprint,
  dressFootprint,
  pantFootprint,
  shirtFootprint,
  shoesFootprint,
  shortFootprint,
  smallItemFootprint,
  sweatShirtFootprint,
  sweaterFootprint,
  tshirtFootprint,
} from "./constants";

type Props = {
  tshirts?: number;
  shirts?: number;
  sweatshirts?: number;
  sweaters?: number;
  shorts?: number;
  coats?: number;
  dresses?: number;
  pants?: number;
  shoes?: number;
  smallItems?: number;
  bigItems?: number;
};

export class Clothes implements WithAnnualFootprint {
  tshirts: number;
  shirts: number;
  sweatshirts: number;
  sweaters: number;
  shorts: number;
  coats: number;
  dresses: number;
  pants: number;
  shoes: number;
  smallItems: number;
  bigItems: number;

  constructor({
    tshirts,
    shirts,
    sweatshirts,
    sweaters,
    shorts,
    coats,
    dresses,
    pants,
    shoes,
    smallItems,
    bigItems,
  }: Props) {
    this.tshirts = tshirts ?? 0;
    this.shirts = shirts ?? 0;
    this.sweatshirts = sweatshirts ?? 0;
    this.sweaters = sweaters ?? 0;
    this.shorts = shorts ?? 0;
    this.coats = coats ?? 0;
    this.dresses = dresses ?? 0;
    this.pants = pants ?? 0;
    this.shoes = shoes ?? 0;
    this.smallItems = smallItems ?? 0;
    this.bigItems = bigItems ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.tshirtsAnnualFootprint +
        this.shirtsAnnualFootprint +
        this.sweatshirtsAnnualFootprint +
        this.sweatersAnnualFootprint +
        this.shortsAnnualFootprint +
        this.coatsAnnualFootprint +
        this.dressesAnnualFootprint +
        this.pantsAnnualFootprint +
        this.shoesAnnualFootprint +
        this.smallItemsAnnualFootprint +
        this.bigItemsAnnualFootprint,
    );
  }

  private get tshirtsAnnualFootprint(): number {
    return this.tshirts * tshirtFootprint;
  }

  private get shirtsAnnualFootprint(): number {
    return this.shirts * shirtFootprint;
  }

  private get sweatshirtsAnnualFootprint(): number {
    return this.sweatshirts * sweatShirtFootprint;
  }

  private get sweatersAnnualFootprint(): number {
    return this.sweaters * sweaterFootprint;
  }

  private get shortsAnnualFootprint(): number {
    return this.shorts * shortFootprint;
  }

  private get coatsAnnualFootprint(): number {
    return this.coats * coatFootprint;
  }

  private get dressesAnnualFootprint(): number {
    return this.dresses * dressFootprint;
  }

  private get pantsAnnualFootprint(): number {
    return this.pants * pantFootprint;
  }

  private get shoesAnnualFootprint(): number {
    return this.shoes * shoesFootprint;
  }

  private get smallItemsAnnualFootprint(): number {
    return this.smallItems * smallItemFootprint;
  }

  private get bigItemsAnnualFootprint(): number {
    return this.bigItems * bigItemFootprint;
  }
}
