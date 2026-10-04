import { niceYAxis } from "@carbonFootprint/view/screens/history/niceYAxis";

describe("niceYAxis", () => {
  it("lands every step on a round number", () => {
    expect(niceYAxis(8.8, 4)).toEqual({ maxValue: 10, stepValue: 2.5 });
  });

  it("keeps the highest value inside the axis", () => {
    const { maxValue } = niceYAxis(12.9, 4);

    expect(maxValue).toBeGreaterThanOrEqual(12.9);
  });

  it("scales down to values under a tonne", () => {
    expect(niceYAxis(0.7, 4)).toEqual({ maxValue: 0.8, stepValue: 0.2 });
  });

  it("keeps an axis when every value is zero", () => {
    expect(niceYAxis(0, 4)).toEqual({ maxValue: 4, stepValue: 1 });
  });
});
