import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import {
  FootprintCategory,
  mapFootprintCategories,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
import { ImageAssets } from "@common/utils/imageAssets";

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

  static forCategory(
    category: FootprintCategory,
    footprint: number,
    totalFootprint: number,
  ): FootprintCategoryViewModel {
    switch (category) {
      case "transport":
        return new FootprintCategoryTransport(footprint, totalFootprint);
      case "food":
        return new FootprintCategoryFood(footprint, totalFootprint);
      case "housing":
        return new FootprintCategoryHousing(footprint, totalFootprint);
      case "everydayThings":
        return new FootprintCategoryEverydayThings(footprint, totalFootprint);
      case "societalServices":
        return new FootprintCategoryPublicServices(footprint, totalFootprint);
    }
  }

  /** Every category, with the rounded parts distributed so they sum to 100. */
  static forCategories = (
    footprints: Record<FootprintCategory, number>,
    totalFootprint: number,
  ): FootprintViewModels =>
    FootprintCategoryViewModel.distributeParts(
      mapFootprintCategories((category) =>
        FootprintCategoryViewModel.forCategory(
          category,
          footprints[category],
          totalFootprint,
        ),
      ),
    );

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
