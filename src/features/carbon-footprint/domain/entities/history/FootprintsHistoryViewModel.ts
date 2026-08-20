import {
  FootprintCategoryViewModel,
  FootprintViewModels,
} from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/Footprints";
import {
  FootprintSnapshot,
  FootprintsHistory,
  MIN_SNAPSHOTS_FOR_CHART,
  totalOf,
} from "@carbonFootprint/domain/entities/history/FootprintSnapshot";

export type HistoryFilter = "all" | FootprintCategory;

export type HistoryPoint = {
  date: string;
  /** kgCO2e/year for the active filter. */
  value: number;
};

export type HistoryTrend = "down" | "up" | "stable";

export type HistoryVariation = {
  /** The point the current value is compared against. */
  fromDate: string;
  deltaKg: number;
  /** Absolute, rounded. The sign lives in `trend`, as in `FrenchAverageComparisonViewModel`. */
  percentage: number;
  trend: HistoryTrend;
};

export type FootprintsHistoryViewModel = {
  points: HistoryPoint[];
  hasEnoughData: boolean;
  currentValue: number;
  variation: HistoryVariation | null;
  /**
   * The date actually driving the comparison, or `null` when the default
   * (previous point) applies. Not always what the caller asked for: a selection
   * is dropped outside the "all" filter, on the latest point, or on a date the
   * history no longer holds.
   */
  selectedDate: string | null;
  /** Category split at the selected date. Only meaningful under the "all" filter. */
  breakdown: FootprintViewModels | null;
};

const valueOf = (snapshot: FootprintSnapshot, filter: HistoryFilter): number =>
  filter === "all" ? totalOf(snapshot) : snapshot.footprints[filter];

const buildBreakdown = (snapshot: FootprintSnapshot): FootprintViewModels => {
  const total = totalOf(snapshot);
  const { footprints } = snapshot;

  return FootprintCategoryViewModel.distributeParts({
    transport: FootprintCategoryViewModel.forTransport(
      footprints.transport,
      total,
    ),
    food: FootprintCategoryViewModel.forFood(footprints.food, total),
    housing: FootprintCategoryViewModel.forHousing(footprints.housing, total),
    everydayThings: FootprintCategoryViewModel.forEverydayThings(
      footprints.everydayThings,
      total,
    ),
    societalServices: FootprintCategoryViewModel.forSocietalServices(
      footprints.societalServices,
      total,
    ),
  });
};

const buildVariation = (
  from: HistoryPoint,
  to: HistoryPoint,
): HistoryVariation => {
  const deltaKg = to.value - from.value;

  return {
    fromDate: from.date,
    deltaKg,
    // A category that was at zero has no meaningful ratio to grow from.
    percentage:
      from.value === 0 ? 0 : Math.round((Math.abs(deltaKg) / from.value) * 100),
    trend: deltaKg === 0 ? "stable" : deltaKg < 0 ? "down" : "up",
  };
};

export const buildFootprintsHistoryViewModel = (
  history: FootprintsHistory,
  filter: HistoryFilter,
  selectedDate: string | null,
): FootprintsHistoryViewModel => {
  const points: HistoryPoint[] = history.map((snapshot) => ({
    date: snapshot.date,
    value: valueOf(snapshot, filter),
  }));

  const hasEnoughData = points.length >= MIN_SNAPSHOTS_FOR_CHART;
  const latest = points[points.length - 1];

  if (!hasEnoughData)
    return {
      points,
      hasEnoughData,
      currentValue: latest?.value ?? 0,
      variation: null,
      selectedDate: null,
      breakdown: null,
    };

  const selectedIndex =
    filter === "all" && selectedDate
      ? points.findIndex(({ date }) => date === selectedDate)
      : -1;

  // The latest point *is* "today": comparing it against itself would show 0 %.
  const effectiveIndex =
    selectedIndex >= 0 && selectedIndex < points.length - 1
      ? selectedIndex
      : null;

  const reference = points[effectiveIndex ?? points.length - 2];

  return {
    points,
    hasEnoughData,
    currentValue: latest.value,
    variation: buildVariation(reference, latest),
    selectedDate: effectiveIndex === null ? null : points[effectiveIndex].date,
    breakdown:
      effectiveIndex === null ? null : buildBreakdown(history[effectiveIndex]),
  };
};
