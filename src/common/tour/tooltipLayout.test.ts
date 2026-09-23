import { computeTooltipLayout } from "@common/tour/tooltipLayout";
import {
  TOOLTIP_ARROW_SIZE,
  TOOLTIP_MARGIN,
  TOOLTIP_MAX_WIDTH,
} from "@common/tour/tourConstants";
import { TourInsets, TourWindow } from "@common/tour/types";

const window: TourWindow = { width: 400, height: 800 };
const insets: TourInsets = { top: 40, bottom: 20 };
const tooltipHeight = 160;

const layoutFor = (hole: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => computeTooltipLayout({ hole, tooltipHeight, window, insets });

describe("computeTooltipLayout", () => {
  it("sits below a target near the top of the screen", () => {
    const layout = layoutFor({ x: 100, y: 60, width: 200, height: 40 });

    expect(layout.side).toBe("bottom");
    expect(layout.top).toBe(60 + 40 + TOOLTIP_MARGIN);
  });

  it("sits above a target near the bottom of the screen", () => {
    const layout = layoutFor({ x: 100, y: 700, width: 200, height: 40 });

    expect(layout.side).toBe("top");
    expect(layout.top).toBe(700 - TOOLTIP_MARGIN - tooltipHeight);
  });

  it("stays inside the insets when it fits on neither side", () => {
    const layout = computeTooltipLayout({
      hole: { x: 0, y: 100, width: window.width, height: 600 },
      tooltipHeight,
      window,
      insets,
    });

    expect(layout.top).toBeGreaterThanOrEqual(insets.top + TOOLTIP_MARGIN);
    expect(layout.top + tooltipHeight).toBeLessThanOrEqual(
      window.height - insets.bottom - TOOLTIP_MARGIN,
    );
  });

  it("honours an explicit placement when there is room", () => {
    const hole = { x: 100, y: 400, width: 200, height: 40 };

    expect(
      computeTooltipLayout({
        hole,
        tooltipHeight,
        window,
        insets,
        placement: "top",
      }).side,
    ).toBe("top");
    expect(
      computeTooltipLayout({
        hole,
        tooltipHeight,
        window,
        insets,
        placement: "bottom",
      }).side,
    ).toBe("bottom");
  });

  it("keeps the card on screen for a target hugging an edge", () => {
    const leftEdge = layoutFor({ x: 0, y: 300, width: 40, height: 40 });
    const rightEdge = layoutFor({ x: 360, y: 300, width: 40, height: 40 });

    expect(leftEdge.left).toBe(TOOLTIP_MARGIN);
    expect(rightEdge.left + rightEdge.width).toBe(
      window.width - TOOLTIP_MARGIN,
    );
  });

  it("keeps the arrow inside the card for a target hugging an edge", () => {
    const layout = layoutFor({ x: 0, y: 300, width: 40, height: 40 });

    expect(layout.arrowLeft).toBeGreaterThanOrEqual(0);
    expect(layout.arrowLeft).toBeLessThanOrEqual(
      layout.width - 2 * TOOLTIP_ARROW_SIZE,
    );
  });

  it("points the arrow at the centre of a centred target", () => {
    const layout = layoutFor({ x: 150, y: 300, width: 100, height: 40 });

    expect(layout.left + layout.arrowLeft + TOOLTIP_ARROW_SIZE).toBe(200);
  });

  it("never exceeds the maximum width nor the window margins", () => {
    const narrow = computeTooltipLayout({
      hole: { x: 10, y: 300, width: 40, height: 40 },
      tooltipHeight,
      window: { width: 320, height: 800 },
      insets,
    });
    const wide = computeTooltipLayout({
      hole: { x: 10, y: 300, width: 40, height: 40 },
      tooltipHeight,
      window: { width: 1024, height: 800 },
      insets,
    });

    expect(narrow.width).toBe(320 - 2 * TOOLTIP_MARGIN);
    expect(wide.width).toBe(TOOLTIP_MAX_WIDTH);
  });
});
