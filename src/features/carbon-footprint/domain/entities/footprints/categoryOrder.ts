import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/Footprints";

/**
 * The one order categories are shown in: the donut's slices clockwise from
 * 12 o'clock, and lists top to bottom. The table under the donut is the
 * exception: it ranks them by impact.
 *
 * The category palette is validated for these neighbours: reorder them and
 * validate it again. Societal services cannot close the ring: its teal would
 * sit next to the transport blue.
 */
export const categoryOrder: FootprintCategory[] = [
  "transport",
  "food",
  "societalServices",
  "housing",
  "everydayThings",
];
