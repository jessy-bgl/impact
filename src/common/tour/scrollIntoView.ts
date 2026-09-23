import { measureNode } from "@common/tour/measureNode";
import { MeasurableNode, TargetRect } from "@common/tour/types";

/** Space kept between a target and the edges of the scroll view. */
const VISIBILITY_MARGIN = 24;

type ScrollableView = MeasurableNode & {
  scrollTo: (options: { y: number; animated: boolean }) => void;
  getInnerViewRef?: () => MeasurableNode | null;
};

export const isRectInside = (
  rect: TargetRect,
  container: TargetRect,
  margin = VISIBILITY_MARGIN,
) =>
  rect.y >= container.y + margin &&
  rect.y + rect.height <= container.y + container.height - margin;

/**
 * Offset that vertically centers `rect` in `container`, or aligns its top when
 * it is too tall to fit. `innerTop` is the content view's window-absolute top,
 * so the current offset is `container.y - innerTop`.
 */
export const computeScrollOffset = (
  rect: TargetRect,
  container: TargetRect,
  innerTop: number,
  margin = VISIBILITY_MARGIN,
) => {
  const currentOffset = container.y - innerTop;
  const fits = rect.height <= container.height - 2 * margin;
  const desiredTop = fits
    ? container.y + (container.height - rect.height) / 2
    : container.y + margin;
  return Math.max(0, currentOffset + rect.y - desiredTop);
};

/** Scrolls `scrollView` so `node` is comfortably visible. True when it scrolled. */
export const scrollNodeIntoView = async (
  scrollView: ScrollableView | null,
  node: MeasurableNode,
): Promise<boolean> => {
  const inner = scrollView?.getInnerViewRef?.();
  if (!scrollView || !inner) return false;

  const [container, innerRect, rect] = await Promise.all([
    measureNode(scrollView),
    measureNode(inner),
    measureNode(node),
  ]);
  if (!container || !innerRect || !rect) return false;
  if (isRectInside(rect, container)) return false;

  scrollView.scrollTo({
    y: computeScrollOffset(rect, container, innerRect.y),
    animated: true,
  });
  return true;
};
