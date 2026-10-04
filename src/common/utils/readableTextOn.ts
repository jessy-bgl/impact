const darkInk = "#111111";
const lightInk = "#FFFFFF";

const channel = (value: number) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

/** Reads `#RRGGBB`, `rgb()` and `rgba()`, the forms the themes use. */
const parseColor = (color: string): number[] => {
  if (/^#[0-9a-f]{6}$/i.test(color))
    return [1, 3, 5].map((start) =>
      parseInt(color.slice(start, start + 2), 16),
    );
  // The alpha, if any, is ignored: fills are expected to be opaque.
  const rgb = color.match(
    /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)\s*(?:,\s*[\d.]+\s*)?\)$/,
  );
  if (rgb) return rgb.slice(1).map(Number);
  throw new Error(`Not a #RRGGBB, rgb() or rgba() color: ${color}`);
};

const relativeLuminance = (color: string) => {
  const [r, g, b] = parseColor(color).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG contrast ratio between two colors, from 1 to 21. */
export const contrastRatio = (a: string, b: string): number => {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  );
  return (lighter + 0.05) / (darker + 0.05);
};

/** The ink, dark or light, that reads best on a fill. */
export const readableTextOn = (fill: string): string =>
  contrastRatio(fill, darkInk) >= contrastRatio(fill, lightInk)
    ? darkInk
    : lightInk;
