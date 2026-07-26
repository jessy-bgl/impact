import { TFunction } from "i18next";

export const resolveUnitAffix = (
  t: TFunction,
  unit?: string,
): string | undefined => {
  if (!unit) return undefined;
  return t(`common:units.${unit}`, { defaultValue: unit });
};
