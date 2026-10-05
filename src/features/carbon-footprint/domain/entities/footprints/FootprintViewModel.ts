import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import {
  CategoryStyleKey,
  categoryIcons,
} from "@carbonFootprint/domain/entities/footprints/categoryIcons";
import {
  FootprintCategory,
  mapFootprintCategories,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { ImageAssets } from "@common/utils/imageAssets";

export type FootprintViewModels = Record<
  FootprintCategory,
  FootprintCategoryViewModel
>;

export class FootprintCategoryViewModel {
  public styleKey: CategoryStyleKey;
  public icon: IconSource;
  public part: number;
  public image!: keyof typeof ImageAssets;

  protected constructor(
    public category: FootprintCategory,
    public footprint: number,
    public totalFootprint: number,
  ) {
    this.part = this.computePart(totalFootprint);
    this.styleKey = category;
    this.icon = categoryIcons[category];
  }

  private computePart = (totalFootprint: number) =>
    totalFootprint === 0 ? 0 : (this.footprint / totalFootprint) * 100;

  static distributeParts = (
    footprints: FootprintViewModels,
  ): FootprintViewModels => {
    FootprintCategoryViewModel.distributeRoundedParts(
      Object.values(footprints),
    );
    return footprints;
  };

  /** Rounds the parts of `viewModels`, so that they sum to 100. */
  private static distributeRoundedParts = (
    viewModels: FootprintCategoryViewModel[],
  ) => {
    const totalFootprint = viewModels.reduce(
      (sum, viewModel) => sum + viewModel.footprint,
      0,
    );

    // Every part is already 0: there is no 100 to distribute, and the loop
    // below would run past the categories.
    if (totalFootprint === 0) return;

    const parts = viewModels.map((viewModel) =>
      viewModel.computePart(totalFootprint),
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

    viewModels.forEach((viewModel, index) => {
      viewModel.part = roundedParts[index];
    });
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

  /**
   * The two halves of the societal services, each with its rounded part of
   * their sum.
   */
  static forSocietalServices = ({
    publicServicesFootprint,
    merchantServicesFootprint,
  }: SocietalServicesFootprint) => {
    const totalFootprint = publicServicesFootprint + merchantServicesFootprint;
    const publicServices = new FootprintCategoryPublicServices(
      publicServicesFootprint,
      totalFootprint,
    );
    const merchantServices = new FootprintCategoryMerchantServices(
      merchantServicesFootprint,
      totalFootprint,
    );

    FootprintCategoryViewModel.distributeRoundedParts([
      publicServices,
      merchantServices,
    ]);

    return { publicServices, merchantServices, totalFootprint };
  };
}

class FootprintCategoryTransport extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("transport", footprint, totalFootprint);
    this.image = "transport";
  }
}

class FootprintCategoryFood extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("food", footprint, totalFootprint);
    this.image = "food";
  }
}

class FootprintCategoryHousing extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("housing", footprint, totalFootprint);
    this.image = "house";
  }
}

class FootprintCategoryEverydayThings extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("everydayThings", footprint, totalFootprint);
    this.image = "goods";
  }
}

class FootprintCategoryPublicServices extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("societalServices", footprint, totalFootprint);
    this.image = "public_services";
  }
}

class FootprintCategoryMerchantServices extends FootprintCategoryViewModel {
  constructor(footprint: number, totalFootprint: number) {
    super("societalServices", footprint, totalFootprint);
    this.styleKey = "merchantServices";
    this.icon = categoryIcons.merchantServices;
  }
}
