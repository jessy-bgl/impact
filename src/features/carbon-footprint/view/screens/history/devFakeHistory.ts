import {
  FootprintsHistory,
  toDayKey,
} from "@carbonFootprint/domain/entities/history/FootprintSnapshot";

/**
 * Dev-only datasets, rendered when the `__DEV__` picker on the history screen
 * selects one. They exist so the chart, the filters, the point selection and
 * both empty states can be seen without waiting weeks for real snapshots to
 * pile up. Nothing writes them to the store, so going back to `real` restores
 * the real history untouched.
 */

// [days ago, transport, food, housing, everydayThings, societalServices] in
// kgCO2e/year. Roughly 12.9 t down to 8.8 t, with a transport rebound around
// the fourth point so the curve is not a straight slide. Societal services stay
// flat: they are not driven by the user's answers.
const series: [number, number, number, number, number, number][] = [
  [300, 4200, 2600, 3100, 1500, 1500],
  [240, 3900, 2600, 3050, 1450, 1500],
  [180, 3400, 2500, 2900, 1400, 1500],
  [120, 3500, 2200, 2900, 1350, 1500],
  [90, 3000, 2050, 2700, 1300, 1500],
  [60, 2800, 1900, 2500, 1250, 1500],
  [30, 2600, 1800, 2400, 1200, 1500],
  [7, 2400, 1750, 2250, 1150, 1500],
  [0, 2300, 1700, 2200, 1100, 1500],
];

const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toDayKey(date);
};

const devFakeHistory: FootprintsHistory = series.map(
  ([days, transport, food, housing, everydayThings, societalServices]) => ({
    date: daysAgo(days),
    footprints: {
      transport,
      food,
      housing,
      everydayThings,
      societalServices,
    },
  }),
);

/** The three states the screen can be in, plus the real data it defaults to. */
export type DevHistoryPreview =
  "real" | "incompleteProfile" | "singleSnapshot" | "fullHistory";

/**
 * Both the history and the profile completion, because the two empty states are
 * told apart by the profile: an empty history under an incomplete profile means
 * tracking has not started, a lone snapshot under a complete one means it just
 * did. Overriding only the history could never reach `singleSnapshot`.
 */
export type DevHistoryOverride = {
  history: FootprintsHistory;
  profileCompleted: boolean;
};

export const devHistoryOverrides: Record<
  DevHistoryPreview,
  DevHistoryOverride | undefined
> = {
  real: undefined,
  incompleteProfile: { history: [], profileCompleted: false },
  // The latest point alone: the value shown is the one the user would see right
  // after their first complete estimate.
  singleSnapshot: {
    history: devFakeHistory.slice(-1),
    profileCompleted: true,
  },
  fullHistory: { history: devFakeHistory, profileCompleted: true },
};
