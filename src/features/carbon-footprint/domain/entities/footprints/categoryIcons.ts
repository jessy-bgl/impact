import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/Footprints";

/**
 * What a category is painted by: the categories, plus merchant services, which
 * the societal services split into and which get their own icon and color.
 */
export type CategoryStyleKey = FootprintCategory | "merchantServices";

export const categoryIcons: Record<CategoryStyleKey, IconSource> = {
  transport: "car",
  food: "silverware-fork-knife",
  housing: "home",
  everydayThings: "shopping",
  societalServices: "bank",
  merchantServices: "post",
};
