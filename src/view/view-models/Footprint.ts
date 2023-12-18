import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import foodImage from "@assets/images/food.svg";
import everydayThingsImage from "@assets/images/goods.svg";
import housingImage from "@assets/images/house.svg";
import publicServicesImage from "@assets/images/public_services.svg";
import transportImage from "@assets/images/transport.svg";
import { FootprintCategories } from "@domain/models/Categories";

export class FootprintByCategory {
  public color: string = "";
  public icon: string = "";
  public part: number;
  public image: string = "";
  public materialIcon: IconSource = "";

  protected constructor(
    public category: FootprintCategories,
    public footprint: number,
    totalFootprint: number,
  ) {
    this.part = this.computePart(totalFootprint);
  }

  static forTransport(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintCategoryTransport(footprint, totalFootprint);
  }

  static forFood(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintCategoryFood(footprint, totalFootprint);
  }

  static forHousing(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintCategoryHousing(footprint, totalFootprint);
  }

  static forEverydayThings(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintCategoryEverydayThings(footprint, totalFootprint);
  }

  static forPublicServices(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintCategoryPublicServices(footprint, totalFootprint);
  }

  private computePart = (totalFootprint: number) =>
    totalFootprint === 0
      ? 0
      : Math.floor((this.footprint / totalFootprint) * 100);
}

class FootprintCategoryTransport extends FootprintByCategory {
  constructor(footprint: number, totalFootprint: number) {
    super(FootprintCategories.TRANSPORT, footprint, totalFootprint);
    this.color = "sandybrown";
    this.icon = "🚗";
    this.materialIcon = "car";
    this.image = transportImage;
  }
}

class FootprintCategoryFood extends FootprintByCategory {
  constructor(footprint: number, totalFootprint: number) {
    super(FootprintCategories.FOOD, footprint, totalFootprint);
    this.color = "plum";
    this.icon = "🍲";
    this.materialIcon = "food";
    this.image = foodImage;
  }
}

class FootprintCategoryHousing extends FootprintByCategory {
  constructor(footprint: number, totalFootprint: number) {
    super(FootprintCategories.HOUSING, footprint, totalFootprint);
    this.color = "cadetblue";
    this.icon = "🏠";
    this.materialIcon = "home";
    this.image = housingImage;
  }
}

class FootprintCategoryEverydayThings extends FootprintByCategory {
  constructor(footprint: number, totalFootprint: number) {
    super(FootprintCategories.EVERYDAY_THINGS, footprint, totalFootprint);
    this.color = "khaki";
    this.icon = "🛍️";
    this.materialIcon = "package";
    this.image = everydayThingsImage;
  }
}

class FootprintCategoryPublicServices extends FootprintByCategory {
  constructor(footprint: number, totalFootprint: number) {
    super(FootprintCategories.PUBLIC_SERVICES, footprint, totalFootprint);
    this.color = "steelblue";
    this.icon = "🏛";
    this.materialIcon = "bank";
    this.image = publicServicesImage;
  }
}

export type Footprints = Record<FootprintCategories, FootprintByCategory>;
