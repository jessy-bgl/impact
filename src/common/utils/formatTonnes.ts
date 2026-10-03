/**
 * kgCO2e are stored, tonnes are shown, with a French decimal comma.
 *
 * Unit-less: each call site appends the unit its layout needs.
 */
export const formatTonnes = (kg: number): string =>
  (kg / 1000).toFixed(2).replace(".", ",");
