import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import foodImage from "@assets/images/food.svg";
import everydayThingsImage from "@assets/images/goods.svg";
import housingImage from "@assets/images/house.svg";
import publicServicesImage from "@assets/images/public_services.svg";
import transportImage from "@assets/images/transport.svg";

import { FootprintCategory } from "@domain/entities/categories/Categories";

export type Footprints = Record<FootprintCategory, FootprintCategoryViewModel>;

export class FootprintCategoryViewModel {
  public color: string = "";
  public icon: string = "";
  public part: number;
  public image: string = "";
  public materialIcon: IconSource = "";

  protected constructor(
    public category: FootprintCategory,
    public footprint: number,
    public totalFootprint: number,
  ) {
    this.part = this.computePart(totalFootprint);
  }

  private computePart = (totalFootprint: number) =>
    totalFootprint === 0
      ? 0
      : Math.floor((this.footprint / totalFootprint) * 100);

  static forTransport(
    footprint: number,
    totalFootprint: number,
  ): FootprintCategoryViewModel {
    return new FootprintCategoryTransport(footprint, totalFootprint);
  }

  static forFood(
    footprint: number,
    totalFootprint: number,
  ): FootprintCategoryViewModel {
    return new FootprintCategoryFood(footprint, totalFootprint);
  }

  static forHousing(
    footprint: number,
    totalFootprint: number,
  ): FootprintCategoryViewModel {
    return new FootprintCategoryHousing(footprint, totalFootprint);
  }

  static forEverydayThings(
    footprint: number,
    totalFootprint: number,
  ): FootprintCategoryViewModel {
    return new FootprintCategoryEverydayThings(footprint, totalFootprint);
  }

  static forPublicServices(
    footprint: number,
    totalFootprint: number,
  ): FootprintCategoryViewModel {
    return new FootprintCategoryPublicServices(footprint, totalFootprint);
  }

  static forMerchantServices(
    footprint: number,
    totalFootprint: number,
  ): FootprintCategoryViewModel {
    return new FootprintCategoryMerchantServices(footprint, totalFootprint);
  }
}

class FootprintCategoryTransport extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("transport", footprint, totalFootprint);
    this.color = "sandybrown";
    this.icon = "🚗";
    this.materialIcon = "car";
    this.image = transportImage;
  }
}

class FootprintCategoryFood extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("food", footprint, totalFootprint);
    this.color = "plum";
    this.icon = "🍲";
    this.materialIcon = "food";
    this.image = foodImage;
  }
}

class FootprintCategoryHousing extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("housing", footprint, totalFootprint);
    this.color = "cadetblue";
    this.icon = "🏠";
    this.materialIcon = "home";
    this.image = housingImage;
  }
}

class FootprintCategoryEverydayThings extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("everydayThings", footprint, totalFootprint);
    this.color = "khaki";
    this.icon = "🛍️";
    this.materialIcon = "package";
    this.image = everydayThingsImage;
  }
}

class FootprintCategoryPublicServices extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("publicServices", footprint, totalFootprint);
    this.color = "steelblue";
    this.icon = "🏛️";
    this.materialIcon = "bank";
    this.image = publicServicesImage;
  }
}

class FootprintCategoryMerchantServices extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("publicServices", footprint, totalFootprint);
    this.color = "cadetblue";
    this.icon = "✉️";
    this.materialIcon = "post";
  }
}
