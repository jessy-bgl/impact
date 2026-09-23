import { MEASURE_CALLBACK_TIMEOUT_MS } from "@common/tour/tourConstants";
import { MeasurableNode, TargetRect } from "@common/tour/types";

/**
 * Resolves `null` rather than throwing when the node cannot be measured: on a
 * not-yet-laid-out view, and under Jest where `measureInWindow` is not
 * implemented. Callers treat `null` as "retry, then skip the step".
 */
export const measureNode = (node: MeasurableNode): Promise<TargetRect | null> =>
  new Promise((resolve) => {
    if (typeof node.measureInWindow !== "function") {
      resolve(null);
      return;
    }

    let settled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    node.measureInWindow((x, y, width, height) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      const isMeasurable = [x, y, width, height].every(Number.isFinite);
      resolve(
        isMeasurable && width > 0 && height > 0
          ? { x, y, width, height }
          : null,
      );
    });

    // measureInWindow never calls back on an unmounted or zero-sized node. The
    // callback may come back asynchronously, hence a delay rather than `0`.
    if (settled) return;
    timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      resolve(null);
    }, MEASURE_CALLBACK_TIMEOUT_MS);
  });
