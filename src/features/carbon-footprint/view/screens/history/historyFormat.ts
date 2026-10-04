import { parseDayKey } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import { HistoryFilter } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { CategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { formatTonnes } from "@common/utils/formatTonnes";

export const filterColor = (
  filter: HistoryFilter,
  fallback: string,
  palette: CategoryPalette,
): string => (filter === "all" ? fallback : palette[filter]);

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
