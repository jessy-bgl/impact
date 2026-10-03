import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { mapFootprintCategories } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { parseDayKey } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import { HistoryFilter } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { formatTonnes } from "@common/utils/formatTonnes";

/**
 * Colour and emoji per category, taken from the same view models that paint the
 * donut so the history and the distribution never drift apart.
 */
export const categoryStyles = mapFootprintCategories((category) =>
  FootprintCategoryViewModel.forCategory(category, 0, 0),
);

export const filterColor = (filter: HistoryFilter, fallback: string): string =>
  filter === "all" ? fallback : categoryStyles[filter].color;

const longDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDate = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
});

export const formatLongDate = (dayKey: string): string =>
  longDate.format(parseDayKey(dayKey));

export const formatShortDate = (dayKey: string): string =>
  shortDate.format(parseDayKey(dayKey)).replace(".", "");

/** Same unit-less output as `formatTonnes`, with the direction spelled out. */
export const formatSignedTonnes = (deltaKg: number): string =>
  `${deltaKg > 0 ? "+" : "−"}${formatTonnes(Math.abs(deltaKg))}`;
