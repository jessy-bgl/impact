import { clamp } from "@common/tour/geometry";
import { TargetRect, TourWindow } from "@common/tour/types";

/**
 * Grows the measured target by `padding` and clamps it inside the window, so
 * the hole never bleeds off-screen and never gets a negative dimension.
 */
export const computeHole = (
  rect: TargetRect,
  padding: number,
  window: TourWindow,
): TargetRect => {
  const left = clamp(rect.x - padding, 0, window.width);
  const top = clamp(rect.y - padding, 0, window.height);
  const right = clamp(rect.x + rect.width + padding, 0, window.width);
  const bottom = clamp(rect.y + rect.height + padding, 0, window.height);

  return {
    x: left,
    y: top,
    width: Math.max(right - left, 0),
    height: Math.max(bottom - top, 0),
  };
};

/**
 * The four dimming rectangles tiling the window around the hole. The hole is
 * left physically empty so touches still reach the real UI underneath.
 */
export const computeDimRects = (
  hole: TargetRect,
  window: TourWindow,
): TargetRect[] => {
  const holeRight = hole.x + hole.width;
  const holeBottom = hole.y + hole.height;

  return [
    { x: 0, y: 0, width: window.width, height: Math.max(hole.y, 0) },
    {
      x: 0,
      y: holeBottom,
      width: window.width,
      height: Math.max(window.height - holeBottom, 0),
    },
    { x: 0, y: hole.y, width: Math.max(hole.x, 0), height: hole.height },
    {
      x: holeRight,
      y: hole.y,
      width: Math.max(window.width - holeRight, 0),
      height: hole.height,
    },
  ];
};

/**
 * Keeps the hole's corner radius within half its smallest side, so a thin
 * target does not turn the spotlight into a distorted pill.
 */
export const computeHoleRadius = (hole: TargetRect, radius: number) =>
  Math.max(0, Math.min(radius, hole.width / 2, hole.height / 2));
