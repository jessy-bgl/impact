export function roundFootprint(footprint?: number): number | undefined {
  if (footprint === undefined) return footprint;
  return Math.round(footprint);
}
