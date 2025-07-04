import { JSX } from "react";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import FoodImage from "@assets/images/food";
import EverydayThingsImage from "@assets/images/goods";
import HousingImage from "@assets/images/house";
import PublicServicesImage from "@assets/images/public_services";
import TransportImage from "@assets/images/transport";
import { FootprintCategory } from "@domain/entities/footprints/types";

export type Footprints = Record<FootprintCategory, FootprintCategoryViewModel>;

export class FootprintCategoryViewModel {
  public color: string = "";
  public icon: string = "";
  public part: number;
  public image?: JSX.Element;
  public materialIcon: IconSource = "";

  protected constructor(
    public category: FootprintCategory,
    public footprint: number,
    public totalFootprint: number,
  ) {
    this.part = this.computePart(totalFootprint);
  }

  private computePart = (totalFootprint: number) =>
    totalFootprint === 0 ? 0 : (this.footprint / totalFootprint) * 100;

  static distributeParts = (footprints: Footprints): void => {
    const categories = Object.values(footprints);

    const totalFootprint = categories.reduce(
      (sum, category) => sum + category.footprint,
      0,
    );

    const parts = categories.map((category) =>
      category.computePart(totalFootprint),
    );

    const roundedParts = parts.map(Math.floor);
    const totalRounded = roundedParts.reduce((sum, part) => sum + part, 0);
    const remainder = 100 - totalRounded;

    const remainders = parts.map((part, index) => ({
      index,
      remainder: part - roundedParts[index],
    }));

    remainders.sort((a, b) => b.remainder - a.remainder);

    for (let i = 0; i < remainder; i++) {
      roundedParts[remainders[i].index]++;
    }

    Object.keys(footprints).forEach((key, index) => {
      footprints[key as FootprintCategory].part = roundedParts[index];
    });
  };

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

  static forSocietalServices(
    footprint: number,
    totalFootprint: number,
  ): FootprintCategoryViewModel {
    return new FootprintCategoryPublicServices(footprint, totalFootprint);
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
    this.image = TransportImage({});
  }
}

class FootprintCategoryFood extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("food", footprint, totalFootprint);
    this.color = "plum";
    this.icon = "🍲";
    this.materialIcon = "food";
    this.image = FoodImage({});
  }
}

class FootprintCategoryHousing extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("housing", footprint, totalFootprint);
    this.color = "cadetblue";
    this.icon = "🏠";
    this.materialIcon = "home";
    this.image = HousingImage({});
  }
}

class FootprintCategoryEverydayThings extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("everydayThings", footprint, totalFootprint);
    this.color = "khaki";
    this.icon = "🛍️";
    this.materialIcon = "package";
    this.image = EverydayThingsImage({});
  }
}

class FootprintCategoryPublicServices extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("societalServices", footprint, totalFootprint);
    this.color = "steelblue";
    this.icon = "🏛️";
    this.materialIcon = "bank";
    this.image = PublicServicesImage({});
  }
}

class FootprintCategoryMerchantServices extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("societalServices", footprint, totalFootprint);
    this.color = "cadetblue";
    this.icon = "✉️";
    this.materialIcon = "post";
  }
}
