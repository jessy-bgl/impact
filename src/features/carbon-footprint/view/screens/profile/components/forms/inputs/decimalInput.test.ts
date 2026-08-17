import {
  clampToRange,
  DECIMAL_PRECISION,
  isDecimalInput,
  normalizeDecimal,
  parseDecimal,
  roundDecimal,
  stripTrailingSeparator,
} from "@carbonFootprint/view/screens/profile/components/forms/inputs/decimalInput";

describe("isDecimalInput", () => {
  it("accepts both the comma and the dot as decimal separator", () => {
    expect(isDecimalInput("1,5")).toBe(true);
    expect(isDecimalInput("1.5")).toBe(true);
  });

  it("accepts a partial input while the user is typing", () => {
    expect(isDecimalInput("")).toBe(true);
    expect(isDecimalInput("1,")).toBe(true);
    expect(isDecimalInput(",5")).toBe(true);
  });

  it("accepts a negative number", () => {
    expect(isDecimalInput("-1,5")).toBe(true);
  });

  it("rejects a second separator", () => {
    expect(isDecimalInput("1,5,5")).toBe(false);
    expect(isDecimalInput("1.5,5")).toBe(false);
  });

  it("rejects anything that is not a number", () => {
    expect(isDecimalInput("1e5")).toBe(false);
    expect(isDecimalInput("abc")).toBe(false);
    expect(isDecimalInput("1 5")).toBe(false);
  });
});

describe("normalizeDecimal", () => {
  it("turns a comma into a dot", () => {
    expect(normalizeDecimal("1,5")).toBe("1.5");
  });

  it("keeps a dot untouched", () => {
    expect(normalizeDecimal("1.5")).toBe("1.5");
  });

  it("stringifies a number", () => {
    expect(normalizeDecimal(1.5)).toBe("1.5");
  });

  it("returns an empty string for a missing value", () => {
    expect(normalizeDecimal(undefined)).toBe("");
    expect(normalizeDecimal(null)).toBe("");
  });
});

describe("parseDecimal", () => {
  it("parses a comma separated number", () => {
    expect(parseDecimal("1,5")).toBe(1.5);
  });

  it("parses a dot separated number", () => {
    expect(parseDecimal("1.5")).toBe(1.5);
  });

  it("parses a number ending with a separator", () => {
    expect(parseDecimal("1,")).toBe(1);
  });
});

describe("stripTrailingSeparator", () => {
  it("removes a dangling separator", () => {
    expect(stripTrailingSeparator("1,")).toBe("1");
    expect(stripTrailingSeparator("1.")).toBe("1");
  });

  it("keeps a complete number untouched", () => {
    expect(stripTrailingSeparator("1,5")).toBe("1,5");
  });
});

describe("clampToRange", () => {
  it("keeps a value inside the range untouched", () => {
    expect(clampToRange("5", { min: 0, max: 10 })).toBe("5");
    expect(clampToRange("5.5", { min: 0, max: 10 })).toBe("5.5");
  });

  it("clamps a value above the max", () => {
    expect(clampToRange("500", { min: 0, max: 10 })).toBe("10");
  });

  it("clamps a value below the min", () => {
    expect(clampToRange("-5", { min: 0, max: 10 })).toBe("0");
  });

  it("keeps the bounds themselves", () => {
    expect(clampToRange("10", { min: 0, max: 10 })).toBe("10");
    expect(clampToRange("0", { min: 0, max: 10 })).toBe("0");
  });

  it("ignores a bound that is not set", () => {
    expect(clampToRange("500", { min: 0 })).toBe("500");
    expect(clampToRange("-5", { max: 10 })).toBe("-5");
  });

  it("falls back to the min on an empty value", () => {
    expect(clampToRange("", { min: 3, max: 10 })).toBe("3");
  });

  it("falls back to zero on an empty value without min", () => {
    expect(clampToRange("", { max: 10 })).toBe("0");
  });

  it("falls back to the min on an unparsable value", () => {
    expect(clampToRange("-", { min: 3, max: 10 })).toBe("3");
  });
});

describe("roundDecimal", () => {
  it("keeps the decimals up to the supported precision", () => {
    expect(roundDecimal(1.5 + 1)).toBe(2.5);
  });

  it("removes the floating point artifacts", () => {
    expect(roundDecimal(0.1 + 0.2)).toBe(0.3);
  });

  it("rounds beyond the supported precision", () => {
    const beyondPrecision = 1 / 10 ** (DECIMAL_PRECISION + 1);
    expect(roundDecimal(1 + beyondPrecision)).toBe(1);
  });
});
