import { FootprintCategories } from "../../domain/models/Categories";

export class FootprintByCategory {
  public color: string = "";
  public icon: string = "";
  public part: number;

  constructor(
    public category: FootprintCategories,
    public footprint: number,
    totalFootprint: number,
  ) {
    this.part = this.computePart(totalFootprint);
    switch (category) {
      case FootprintCategories.TRANSPORT: {
        this.color = "sandybrown";
        this.icon = "🚗";
        break;
      }
      case FootprintCategories.FOOD: {
        this.color = "plum";
        this.icon = "🍲";
        break;
      }
      case FootprintCategories.HOUSING: {
        this.color = "cadetblue";
        this.icon = "🏠";
        break;
      }
      case FootprintCategories.GOODS: {
        this.color = "khaki";
        this.icon = "🛍️";
        break;
      }
      case FootprintCategories.PUBLIC_SERVICES: {
        this.color = "mediumslateblue";
        this.icon = "🏛";
        break;
      }
    }
  }

  private computePart = (totalFootprint: number) =>
    totalFootprint === 0
      ? 0
      : Math.floor((this.footprint / totalFootprint) * 100);
}

export type Footprints = Record<FootprintCategories, FootprintByCategory>;
