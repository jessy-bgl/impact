/** Event properties: step ids, counts, flags. Never footprint answer values. */
export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null
>;
