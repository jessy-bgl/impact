import {
  darkCategoryPalette,
  lightCategoryPalette,
} from "@carbonFootprint/view/theme/categoryPalette";
import { contrastRatio, readableTextOn } from "@common/utils/readableTextOn";

describe("contrastRatio", () => {
  it("spans 21:1 from black to white", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21);
  });

  it("is 1:1 for a color against itself", () => {
    expect(contrastRatio("#4A3AA7", "#4A3AA7")).toBe(1);
  });

  it("does not depend on the order of the colors", () => {
    expect(contrastRatio("#EDA100", "#111111")).toBe(
      contrastRatio("#111111", "#EDA100"),
    );
  });
});

describe("readableTextOn", () => {
  it("writes dark on a light fill", () => {
    expect(readableTextOn("#EDA100")).toBe("#111111");
  });

  it("writes light on a dark fill", () => {
    expect(readableTextOn("#4A3AA7")).toBe("#FFFFFF");
  });

  it.each([
    ...Object.values(lightCategoryPalette),
    ...Object.values(darkCategoryPalette),
  ])("keeps small text readable, at 4.5:1 or more, on %s", (fill) => {
    expect(contrastRatio(fill, readableTextOn(fill))).toBeGreaterThanOrEqual(
      4.5,
    );
  });

  it.each(Object.values(lightCategoryPalette))(
    "writes light on the light theme's %s category fill",
    (fill) => {
      expect(readableTextOn(fill)).toBe("#FFFFFF");
    },
  );

  it.each(Object.values(darkCategoryPalette))(
    "writes dark on the dark theme's %s category fill",
    (fill) => {
      expect(readableTextOn(fill)).toBe("#111111");
    },
  );

  it.each(["rgb(237, 161, 0)", "rgba(237, 161, 0, 1)"])(
    "reads %s like its hex form",
    (color) => {
      expect(readableTextOn(color)).toBe(readableTextOn("#EDA100"));
    },
  );

  it("rejects a color it cannot read", () => {
    expect(() => readableTextOn("cadetblue")).toThrow();
  });
});
