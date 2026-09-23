import {
  computeDimRects,
  computeHole,
  computeHoleRadius,
} from "@common/tour/spotlightRects";
import { DEFAULT_HOLE_PADDING } from "@common/tour/tourConstants";
import { TargetRect, TourWindow } from "@common/tour/types";

const window: TourWindow = { width: 400, height: 800 };

const area = ({ width, height }: TargetRect) => width * height;

const totalArea = (rects: TargetRect[]) =>
  rects.reduce((sum, rect) => sum + area(rect), 0);

describe("computeHole", () => {
  it("grows the target by the padding on every side", () => {
    const hole = computeHole(
      { x: 100, y: 200, width: 80, height: 40 },
      DEFAULT_HOLE_PADDING,
      window,
    );

    expect(hole).toEqual({
      x: 100 - DEFAULT_HOLE_PADDING,
      y: 200 - DEFAULT_HOLE_PADDING,
      width: 80 + 2 * DEFAULT_HOLE_PADDING,
      height: 40 + 2 * DEFAULT_HOLE_PADDING,
    });
  });

  it("clamps a target overflowing the window edges", () => {
    const hole = computeHole(
      { x: -50, y: -30, width: 500, height: 900 },
      DEFAULT_HOLE_PADDING,
      window,
    );

    expect(hole).toEqual({
      x: 0,
      y: 0,
      width: window.width,
      height: window.height,
    });
  });

  it("collapses a target lying entirely outside the window", () => {
    const hole = computeHole(
      { x: 900, y: 900, width: 10, height: 10 },
      0,
      window,
    );

    expect(area(hole)).toBe(0);
  });
});

describe("computeDimRects", () => {
  it("tiles the whole window around the hole", () => {
    const hole = computeHole(
      { x: 100, y: 200, width: 80, height: 40 },
      DEFAULT_HOLE_PADDING,
      window,
    );

    const rects = computeDimRects(hole, window);

    expect(totalArea(rects) + area(hole)).toBe(window.width * window.height);
  });

  it.each([
    ["top-left corner", { x: 0, y: 0, width: 60, height: 60 }],
    ["bottom-right corner", { x: 340, y: 740, width: 60, height: 60 }],
    ["full width band", { x: 0, y: 300, width: 400, height: 50 }],
  ])("never produces a negative dimension (%s)", (_, rect) => {
    const hole = computeHole(rect, 0, window);

    const rects = computeDimRects(hole, window);

    rects.forEach(({ width, height }) => {
      expect(width).toBeGreaterThanOrEqual(0);
      expect(height).toBeGreaterThanOrEqual(0);
    });
    expect(totalArea(rects) + area(hole)).toBe(window.width * window.height);
  });

  it("dims nothing when the hole covers the window", () => {
    const hole = computeHole(
      { x: 0, y: 0, width: window.width, height: window.height },
      0,
      window,
    );

    expect(totalArea(computeDimRects(hole, window))).toBe(0);
  });

  it("dims everything when there is no hole", () => {
    const hole = { x: 0, y: 0, width: 0, height: 0 };

    expect(totalArea(computeDimRects(hole, window))).toBe(
      window.width * window.height,
    );
  });
});

describe("computeHoleRadius", () => {
  it("keeps the requested radius on a roomy hole", () => {
    expect(computeHoleRadius({ x: 0, y: 0, width: 200, height: 80 }, 12)).toBe(
      12,
    );
  });

  it("caps the radius at half the hole's smallest side", () => {
    const hole = { x: 0, y: 0, width: 200, height: 16 };

    expect(computeHoleRadius(hole, 12)).toBe(hole.height / 2);
  });
});
