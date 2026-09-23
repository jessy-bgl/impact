import { TargetRect } from "@common/tour/types";

/** Keeps `value` within bounds; `min` wins when the bounds cross. */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

export const isSameRect = (a: TargetRect | null, b: TargetRect | null) =>
  a === b ||
  (a !== null &&
    b !== null &&
    a.x === b.x &&
    a.y === b.y &&
    a.width === b.width &&
    a.height === b.height);
