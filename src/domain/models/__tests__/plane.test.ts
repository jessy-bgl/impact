import { Plane } from "../transport/plane/Plane";

describe("Plane", () => {
  it("should give an annual footprint of 0 kgCO2e with default values", () => {
    const plane = new Plane({});
    expect(plane.annualFootprint).toBe(0);
  });

  it("should give an annual footprint of 238 kgCO2e with 2 hours of short haul", () => {
    const plane = new Plane({ usage: true, hoursPerYearInShortHaul: 2 });
    expect(plane.annualFootprint).toBe(238);
  });

  it("should give an annual footprint of 202 kgCO2e with 2 hours of medium haul", () => {
    const plane = new Plane({ usage: true, hoursPerYearInMediumHaul: 2 });
    expect(plane.annualFootprint).toBe(202);
  });

  it("should give an annual footprint of 207 kgCO2e with 2 hours of long haul", () => {
    const plane = new Plane({ usage: true, hoursPerYearInLongHaul: 2 });
    expect(plane.annualFootprint).toBe(207);
  });
});
