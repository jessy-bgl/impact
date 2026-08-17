export const DECIMAL_INPUT_PATTERN = /^-?\d*[.,]?\d*$/;

export const isDecimalInput = (text: string) =>
  DECIMAL_INPUT_PATTERN.test(text);

export const normalizeDecimal = (value: string | number | undefined | null) => {
  if (value === undefined || value === null) return "";
  return String(value).replace(",", ".");
};

export const parseDecimal = (value: string | number | undefined | null) =>
  Number(normalizeDecimal(value));

export const stripTrailingSeparator = (text: string) =>
  text.replace(/[.,]$/, "");

export const DECIMAL_PRECISION = 2;

export const roundDecimal = (value: number) => {
  const factor = 10 ** DECIMAL_PRECISION;
  return Math.round(value * factor) / factor;
};

type Range = { min?: number; max?: number };

export const clampToRange = (value: string, { min, max }: Range) => {
  const parsedValue = parseDecimal(value);
  if (value === "" || Number.isNaN(parsedValue))
    return min !== undefined ? min.toString() : "0";
  if (min !== undefined && parsedValue < min) return min.toString();
  if (max !== undefined && parsedValue > max) return max.toString();
  return value;
};
