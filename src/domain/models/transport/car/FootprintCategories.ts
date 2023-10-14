export enum FootprintCategories {
  TRANSPORT = "transport",
  HOUSING = "housing",
  FOOD = "food",
  GOODS = "goods",
  OTHER = "other",
}

export class FootprintByCategory {
  public color: string = "";
  public icon: string = "";

  constructor(
    public category: FootprintCategories,
    public value: number,
    public part: number,
  ) {
    this.part = Math.floor(part);
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
      case FootprintCategories.OTHER: {
        this.color = "mediumslateblue";
        this.icon = "🍃";
        break;
      }
    }
  }
}
