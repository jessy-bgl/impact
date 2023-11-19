import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import foodImage from "../../../assets/images/food.svg";
import goodsImage from "../../../assets/images/goods.svg";
import housingImage from "../../../assets/images/house.svg";
import publicServicesImage from "../../../assets/images/public_services.svg";
import transportImage from "../../../assets/images/transport.svg";
import { FootprintCategories } from "../../domain/models/Categories";

export class FootprintByCategory {
  public color: string = "";
  public icon: string = "";
  public part: number;
  public image: string = "";
  public materialIcon: IconSource;

  private constructor(
    public category: FootprintCategories,
    public footprint: number,
    totalFootprint: number,
  ) {
    this.part = this.computePart(totalFootprint);
    switch (category) {
      case FootprintCategories.TRANSPORT: {
        this.color = "sandybrown";
        this.icon = "🚗";
        this.materialIcon = "car";
        this.image = transportImage;
        break;
      }
      case FootprintCategories.FOOD: {
        this.color = "plum";
        this.icon = "🍲";
        this.materialIcon = "food";
        this.image = foodImage;
        break;
      }
      case FootprintCategories.HOUSING: {
        this.color = "cadetblue";
        this.icon = "🏠";
        this.materialIcon = "home";
        this.image = housingImage;
        break;
      }
      case FootprintCategories.GOODS: {
        this.color = "khaki";
        this.icon = "🛍️";
        this.materialIcon = "package";
        this.image = goodsImage;
        break;
      }
      case FootprintCategories.PUBLIC_SERVICES: {
        this.color = "mediumslateblue";
        this.icon = "🏛";
        this.materialIcon = "bank";
        this.image = publicServicesImage;
        break;
      }
    }
  }

  static forTransport(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintByCategory(
      FootprintCategories.TRANSPORT,
      footprint,
      totalFootprint,
    );
  }

  static forFood(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintByCategory(
      FootprintCategories.FOOD,
      footprint,
      totalFootprint,
    );
  }
  static forHousing(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintByCategory(
      FootprintCategories.HOUSING,
      footprint,
      totalFootprint,
    );
  }

  static forGoods(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintByCategory(
      FootprintCategories.GOODS,
      footprint,
      totalFootprint,
    );
  }

  static forPublicServices(
    footprint: number,
    totalFootprint: number,
  ): FootprintByCategory {
    return new FootprintByCategory(
      FootprintCategories.PUBLIC_SERVICES,
      footprint,
      totalFootprint,
    );
  }

  private computePart = (totalFootprint: number) =>
    totalFootprint === 0
      ? 0
      : Math.floor((this.footprint / totalFootprint) * 100);
}

export type Footprints = Record<FootprintCategories, FootprintByCategory>;
