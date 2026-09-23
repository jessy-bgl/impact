import { clamp } from "@common/tour/geometry";
import {
  TOOLTIP_ARROW_SIZE,
  TOOLTIP_MARGIN,
  TOOLTIP_MAX_WIDTH,
} from "@common/tour/tourConstants";
import {
  TargetRect,
  TourInsets,
  TourPlacement,
  TourWindow,
} from "@common/tour/types";

export type TooltipLayout = {
  top: number;
  left: number;
  width: number;
  side: "top" | "bottom";
  /** Arrow offset, relative to the tooltip's own left edge. */
  arrowLeft: number;
};

type Params = {
  hole: TargetRect;
  tooltipHeight: number;
  window: TourWindow;
  insets: TourInsets;
  placement?: TourPlacement;
  radius?: number;
};

export const computeTooltipLayout = ({
  hole,
  tooltipHeight,
  window,
  insets,
  placement = "auto",
  radius = 0,
}: Params): TooltipLayout => {
  const width = Math.min(TOOLTIP_MAX_WIDTH, window.width - 2 * TOOLTIP_MARGIN);

  const holeCenterX = hole.x + hole.width / 2;
  const left = clamp(
    holeCenterX - width / 2,
    TOOLTIP_MARGIN,
    window.width - width - TOOLTIP_MARGIN,
  );

  const holeBottom = hole.y + hole.height;
  const spaceBelow =
    window.height - insets.bottom - holeBottom - 2 * TOOLTIP_MARGIN;
  const spaceAbove = hole.y - insets.top - 2 * TOOLTIP_MARGIN;

  const fitsBelow = spaceBelow >= tooltipHeight;
  const fitsAbove = spaceAbove >= tooltipHeight;

  let side: "top" | "bottom";
  if (placement === "bottom") side = fitsBelow || !fitsAbove ? "bottom" : "top";
  else if (placement === "top")
    side = fitsAbove || !fitsBelow ? "top" : "bottom";
  else if (fitsBelow) side = "bottom";
  else if (fitsAbove) side = "top";
  else side = spaceBelow >= spaceAbove ? "bottom" : "top";

  const unclampedTop =
    side === "bottom"
      ? holeBottom + TOOLTIP_MARGIN
      : hole.y - TOOLTIP_MARGIN - tooltipHeight;

  const top = clamp(
    unclampedTop,
    insets.top + TOOLTIP_MARGIN,
    window.height - insets.bottom - TOOLTIP_MARGIN - tooltipHeight,
  );

  const arrowLeft = clamp(
    holeCenterX - left - TOOLTIP_ARROW_SIZE,
    radius,
    width - radius - 2 * TOOLTIP_ARROW_SIZE,
  );

  return { top, left, width, side, arrowLeft };
};
