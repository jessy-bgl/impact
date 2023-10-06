export enum EmissionCategories {
  TRANSPORT = "transport",
  HOUSING = "housing",
  FOOD = "food",
  GOODS = "goods",
  NUMERIC = "numeric",
}

export class EmissionsByCategory {
  public color: string = "";
  public icon: string = "";

  constructor(
    public type: EmissionCategories,
    public value: number,
    public part: number,
  ) {
    switch (type) {
      case EmissionCategories.TRANSPORT: {
        this.color = "sandybrown";
        this.icon = "🚗";
        break;
      }
      case EmissionCategories.FOOD: {
        this.color = "plum";
        this.icon = "🍲";
        break;
      }
      case EmissionCategories.HOUSING: {
        this.color = "coral";
        this.icon = "🏠";
        break;
      }
      case EmissionCategories.GOODS: {
        this.color = "khaki";
        this.icon = "🛍️";
        break;
      }
      case EmissionCategories.NUMERIC: {
        this.color = "cornflowerblue";
        this.icon = "💻";
        break;
      }
    }
  }
}
