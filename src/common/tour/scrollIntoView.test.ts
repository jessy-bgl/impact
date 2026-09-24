import { computeScrollOffset, isRectInside } from "@common/tour/scrollIntoView";
import { TargetRect } from "@common/tour/types";

const container: TargetRect = { x: 0, y: 100, width: 320, height: 500 };
const MARGIN = 20;
/** Tall enough for any offset these tests reach. */
const LONG_CONTENT = 5000;

describe("isRectInside", () => {
  it("accepts a target comfortably inside the container", () => {
    const rect = { x: 0, y: 300, width: 100, height: 40 };

    expect(isRectInside(rect, container, MARGIN)).toBe(true);
  });

  it("rejects a target below the fold", () => {
    const rect = { x: 0, y: 590, width: 100, height: 40 };

    expect(isRectInside(rect, container, MARGIN)).toBe(false);
  });

  it("rejects a target hidden above the container, under the header", () => {
    const rect = { x: 0, y: 50, width: 100, height: 40 };

    expect(isRectInside(rect, container, MARGIN)).toBe(false);
  });
});

describe("computeScrollOffset", () => {
  it("centers the target in the container", () => {
    const currentOffset = 200;
    const innerTop = container.y - currentOffset;
    const rect = { x: 0, y: 900, width: 100, height: 40 };

    const offset = computeScrollOffset(
      rect,
      container,
      innerTop,
      LONG_CONTENT,
      MARGIN,
    );

    const targetTopAfterScroll = rect.y - (offset - currentOffset);
    expect(targetTopAfterScroll + rect.height / 2).toBe(
      container.y + container.height / 2,
    );
  });

  it("aligns the top of a target too tall to be centered", () => {
    const innerTop = container.y;
    const rect = { x: 0, y: 900, width: 100, height: 800 };

    const offset = computeScrollOffset(
      rect,
      container,
      innerTop,
      LONG_CONTENT,
      MARGIN,
    );

    expect(rect.y - offset).toBe(container.y + MARGIN);
  });

  it("never scrolls above the top of the content", () => {
    const innerTop = container.y;
    const rect = { x: 0, y: 110, width: 100, height: 40 };

    expect(
      computeScrollOffset(rect, container, innerTop, LONG_CONTENT, MARGIN),
    ).toBe(0);
  });

  it("never scrolls past the bottom of the content", () => {
    const innerTop = container.y;
    const contentHeight = 1000;
    const rect = { x: 0, y: 1050, width: 100, height: 40 };

    expect(
      computeScrollOffset(rect, container, innerTop, contentHeight, MARGIN),
    ).toBe(contentHeight - container.height);
  });
});
