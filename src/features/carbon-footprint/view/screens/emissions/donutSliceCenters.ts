export type Point = { x: number; y: number };

/**
 * Middle of each donut slice, halfway through the ring, in a square of side
 * `2 * radius`.
 *
 * Slices start at 12 o'clock and run clockwise, like gifted-charts' PieChart
 * with its default `initialAngle`. A slice whose arc is shorter than
 * `minArcLength` gets no center: what is drawn there would overflow it.
 */
export const computeDonutSliceCenters = (
  values: number[],
  radius: number,
  innerRadius: number,
  minArcLength = 0,
): (Point | undefined)[] => {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return values.map(() => undefined);

  const ringMiddle = (radius + innerRadius) / 2;

  let start = 0;
  return values.map((value) => {
    const fraction = value / total;
    const angle = 2 * Math.PI * (start + fraction / 2);
    start += fraction;

    if (value <= 0 || 2 * Math.PI * fraction * ringMiddle < minArcLength)
      return undefined;

    return {
      x: radius + ringMiddle * Math.sin(angle),
      y: radius - ringMiddle * Math.cos(angle),
    };
  });
};
