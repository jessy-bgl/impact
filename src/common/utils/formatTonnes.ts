/** The smallest amount `formatTonnes` shows, `< ` before it. */
export const smallestShownTonnes = "0,01";

/**
 * Whether two decimals of a tonne would show a real footprint as nothing:
 * a few kgCO2e must not read as "0,00".
 */
export const isBelowShownTonnes = (kg: number): boolean =>
  kg > 0 && Number((kg / 1000).toFixed(2)) === 0;

/**
 * kgCO2e are stored, tonnes are shown, with a French decimal comma.
 *
 * Unit-less: each call site appends the unit its layout needs.
 */
export const formatTonnes = (kg: number): string =>
  isBelowShownTonnes(kg)
    ? `< ${smallestShownTonnes}`
    : (kg / 1000).toFixed(2).replace(".", ",");
