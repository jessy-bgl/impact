import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/types";
import { ImageAssets } from "@carbonFootprint/view/utils/imageAssets";

export type FootprintViewModels = Record<
  FootprintCategory,
  FootprintCategoryViewModel
>;

export class FootprintCategoryViewModel {
  public color: string = "";
  public icon: string = "";
  public part: number;
  public image!: keyof typeof ImageAssets;
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

  static distributeParts = (
    footprints: FootprintViewModels,
  ): FootprintViewModels => {
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

    return footprints;
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
    this.color = "cadetblue";
    this.icon = "🚗";
    this.materialIcon = "car";
    this.image = "transport";
  }
}

class FootprintCategoryFood extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("food", footprint, totalFootprint);
    this.color = "lightcoral";
    this.icon = "🍲";
    this.materialIcon = "food";
    this.image = "food";
  }
}

class FootprintCategoryHousing extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("housing", footprint, totalFootprint);
    this.color = "#4d90c6ff";
    this.icon = "🏠";
    this.materialIcon = "home";
    this.image = "house";
  }
}

class FootprintCategoryEverydayThings extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("everydayThings", footprint, totalFootprint);
    this.color = "#c37ec3ff";
    this.icon = "🛍️";
    this.materialIcon = "package";
    this.image = "goods";
  }
}

class FootprintCategoryPublicServices extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("societalServices", footprint, totalFootprint);
    this.color = "burlywood";
    this.icon = "🏛️";
    this.materialIcon = "bank";
    this.image = "public_services";
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
