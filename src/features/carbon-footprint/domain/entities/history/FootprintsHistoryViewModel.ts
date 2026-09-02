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

export type HistorySelection = {
  /** The selected point's own date. */
  date: string;
  /** kgCO2e/year at that date, for the active filter. */
  value: number;
  /**
   * That date read against today: `+0,70 t` means it sat 0.70 t above the
   * current footprint. The mirror image of the view model's `variation`, which
   * reads today against that date.
   */
  variation: HistoryVariation;
  /**
   * Category split at that date. Only the total splits into categories, so this
   * stays `null` under a category filter.
   */
  breakdown: FootprintViewModels | null;
};

/**
 * Why there is no chart to draw. `singleSnapshot` carries the value it has:
 * tracking has started, there is just nothing to draw a trend from yet.
 */
export type HistoryEmptyStateVariant =
  { name: "incompleteProfile" } | { name: "singleSnapshot"; value: number };

export type FootprintsHistoryViewModel = {
  points: HistoryPoint[];
  hasEnoughData: boolean;
  currentValue: number;
  variation: HistoryVariation | null;
  /**
   * The selected point, or `null` when the default comparison (previous point)
   * applies. Not always what the caller asked for: a selection is dropped on the
   * latest point, or on a date the history no longer holds.
   */
  selection: HistorySelection | null;
};

const valueOf = (snapshot: FootprintSnapshot, filter: HistoryFilter): number =>
  filter === "all" ? totalOf(snapshot) : snapshot.footprints[filter];

const buildBreakdown = (snapshot: FootprintSnapshot): FootprintViewModels =>
  FootprintCategoryViewModel.forCategories(
    snapshot.footprints,
    totalOf(snapshot),
  );

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
      selection: null,
    };

  const selectedIndex = selectedDate
    ? points.findIndex(({ date }) => date === selectedDate)
    : -1;

  // The latest point *is* "today": comparing it against itself would show 0 %.
  const effectiveIndex =
    selectedIndex >= 0 && selectedIndex < points.length - 1
      ? selectedIndex
      : null;

  const selection =
    effectiveIndex === null
      ? null
      : {
          date: points[effectiveIndex].date,
          value: points[effectiveIndex].value,
          variation: buildVariation(latest, points[effectiveIndex]),
          breakdown:
            filter === "all" ? buildBreakdown(history[effectiveIndex]) : null,
        };

  const reference = points[effectiveIndex ?? points.length - 2];

  return {
    points,
    hasEnoughData,
    currentValue: latest.value,
    variation: buildVariation(reference, latest),
    selection,
  };
};
