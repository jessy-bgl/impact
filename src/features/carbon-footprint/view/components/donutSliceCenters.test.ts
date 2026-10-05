import { computeDonutSliceCenters } from "@carbonFootprint/view/components/donutSliceCenters";

const radius = 100;
const innerRadius = 50;
const ringMiddle = (radius + innerRadius) / 2;

describe("computeDonutSliceCenters", () => {
  it("puts each center halfway through the ring, clockwise from 12 o'clock", () => {
    const centers = computeDonutSliceCenters([1, 1, 1, 1], radius, innerRadius);
    const offset = ringMiddle * Math.SQRT1_2;

    expect(centers).toEqual([
      {
        x: expect.closeTo(radius + offset),
        y: expect.closeTo(radius - offset),
      },
      {
        x: expect.closeTo(radius + offset),
        y: expect.closeTo(radius + offset),
      },
      {
        x: expect.closeTo(radius - offset),
        y: expect.closeTo(radius + offset),
      },
      {
        x: expect.closeTo(radius - offset),
        y: expect.closeTo(radius - offset),
      },
    ]);
  });

  it("centers a slice on the middle of its own arc", () => {
    const [first] = computeDonutSliceCenters([1, 3], radius, innerRadius);

    expect(first).toEqual({
      x: expect.closeTo(radius + ringMiddle * Math.sin(Math.PI / 4)),
      y: expect.closeTo(radius - ringMiddle * Math.cos(Math.PI / 4)),
    });
  });

  it("puts a whole-ring slice at 6 o'clock", () => {
    expect(computeDonutSliceCenters([5], radius, innerRadius)).toEqual([
      { x: expect.closeTo(radius), y: expect.closeTo(radius + ringMiddle) },
    ]);
  });

  it("gives no center to an empty slice", () => {
    const [, empty] = computeDonutSliceCenters([1, 0, 1], radius, innerRadius);

    expect(empty).toBeUndefined();
  });

  it("gives no center when every slice is empty", () => {
    expect(computeDonutSliceCenters([0, 0], radius, innerRadius)).toEqual([
      undefined,
      undefined,
    ]);
  });

  it("gives no center to a slice too short to hold the label", () => {
    const [tiny, large] = computeDonutSliceCenters(
      [1, 99],
      radius,
      innerRadius,
      2 * Math.PI * ringMiddle * 0.02,
    );

    expect(tiny).toBeUndefined();
    expect(large).toBeDefined();
  });
});
