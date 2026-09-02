import {
  footprintCategories,
  FootprintCategory,
  Footprints,
} from "@carbonFootprint/domain/entities/footprints/Footprints";

/**
 * One day's footprints, as plain numbers.
 *
 * Deliberately NOT the `Footprints` classes: their `annualFootprint` is a
 * prototype getter, and anything persisted through AsyncStorage comes back as a
 * bare object where that getter no longer exists. A history made of class
 * instances would rehydrate as a list of `undefined` totals.
 */
export type FootprintSnapshot = {
  /** Local calendar day, `YYYY-MM-DD`. Primary key of the history. */
  date: string;
  /** kgCO2e/year per category, rounded integers. */
  footprints: Record<FootprintCategory, number>;
};

/** Sorted by ascending date, with no two consecutive entries holding the same footprints. */
export type FootprintsHistory = FootprintSnapshot[];

/** Below this, there is nothing to draw a trend from and the screen shows an empty state. */
export const MIN_SNAPSHOTS_FOR_CHART = 2;

const pad = (value: number): string => String(value).padStart(2, "0");

/**
 * The day as the user experiences it, in their own timezone.
 *
 * `toISOString().slice(0, 10)` would key on the UTC day instead, filing every
 * French evening answer after 22:00 (summer) under the next day.
 */
export const toDayKey = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/**
 * Inverse of `toDayKey`, for formatting.
 *
 * `new Date("2026-03-12")` would parse as UTC midnight and render as 11 March
 * for anyone west of Greenwich.
 */
export const parseDayKey = (dayKey: string): Date => {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const totalOf = (snapshot: FootprintSnapshot): number =>
  footprintCategories.reduce(
    (total, category) => total + snapshot.footprints[category],
    0,
  );

export const haveSameFootprints = (
  a: FootprintSnapshot,
  b: FootprintSnapshot,
): boolean =>
  footprintCategories.every(
    (category) => a.footprints[category] === b.footprints[category],
  );

/**
 * Returns `null` when any category total is not a finite number.
 *
 * That happens in the window between store rehydration and the startup sync:
 * the persisted footprints are bare objects whose `annualFootprint` getter is
 * gone, so they read as `undefined`. Recording then would write a snapshot of
 * `NaN`s over a legitimate history.
 */
export const buildSnapshot = (
  date: string,
  footprints: Footprints,
): FootprintSnapshot | null => {
  const values = {} as Record<FootprintCategory, number>;

  for (const category of footprintCategories) {
    const value = footprints[category]?.annualFootprint;
    if (typeof value !== "number" || !Number.isFinite(value)) return null;
    values[category] = value;
  }

  return { date, footprints: values };
};

/**
 * Upserts the day's snapshot, keeping the history free of consecutive duplicates.
 *
 * Returns `null` when there is nothing to write, so the caller can skip the
 * store update: without it, every app start would append an identical point and
 * flatten the chart into noise.
 */
export const upsertSnapshot = (
  history: FootprintsHistory,
  snapshot: FootprintSnapshot,
): FootprintsHistory | null => {
  const last = history[history.length - 1];

  // Re-recording the day with an unchanged value: the startup sync does this on
  // every launch, so it must not churn the array reference.
  if (last && last.date === snapshot.date && haveSameFootprints(last, snapshot))
    return null;

  const replacesToday = last?.date === snapshot.date;
  const withoutToday = replacesToday ? history.slice(0, -1) : history;

  const previous = withoutToday[withoutToday.length - 1];
  if (previous && haveSameFootprints(previous, snapshot))
    // The value is back to the previous day's, so no point is owed. Today's
    // now-redundant entry, if there was one, is dropped rather than duplicated.
    return replacesToday ? withoutToday : null;

  return [...withoutToday, snapshot];
};
