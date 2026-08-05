import { TFunction } from "i18next";

// The question title already states the period ("par semaine", "par jour"...),
// so a compound unit like "repas/semaine" is displayed as "repas". Only time
// periods are stripped: physical denominators such as "l/centkm" must be kept.
const TIME_PERIODS = ["semaine", "jour", "mois", "an"];

const translate = (t: TFunction, unit: string, defaultValue: string): string =>
  t(`common:units.${unit}`, { defaultValue });

export const resolveUnitAffix = (
  t: TFunction,
  unit?: string,
): string | undefined => {
  if (!unit) return undefined;

  const translated = translate(t, unit, "");
  if (translated) return translated;

  const [numerator, period] = unit.split("/");
  if (period && TIME_PERIODS.includes(period))
    return translate(t, numerator, numerator);

  return unit;
};
