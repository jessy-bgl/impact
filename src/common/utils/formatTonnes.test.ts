import {
  formatTonnes,
  isBelowShownTonnes,
  smallestShownTonnes,
} from "@common/utils/formatTonnes";

describe("formatTonnes", () => {
  it("shows tonnes with two decimals and a decimal comma", () => {
    expect(formatTonnes(1234)).toBe("1,23");
  });

  it("shows nothing as zero", () => {
    expect(formatTonnes(0)).toBe("0,00");
  });

  it("shows a few kg as under the smallest amount, not as zero", () => {
    expect(formatTonnes(3)).toBe(`< ${smallestShownTonnes}`);
  });

  it("shows the smallest amount once it rounds up to it", () => {
    expect(formatTonnes(10)).toBe(smallestShownTonnes);
  });
});

describe("isBelowShownTonnes", () => {
  it("is true for a few kg only", () => {
    expect(isBelowShownTonnes(3)).toBe(true);
    expect(isBelowShownTonnes(0)).toBe(false);
    expect(isBelowShownTonnes(10)).toBe(false);
  });
});
