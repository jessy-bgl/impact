import { Boat } from "@domain/entities/transport/boat/Boat";

describe("Boat", () => {
  it("should give an annual footprint of 0 kgCO2e with default values", () => {
    const plane = new Boat({});
    expect(plane.annualFootprint).toBe(0);
  });

  it("should give an annual footprint of 0 kgCO2e for a non-user", () => {
    const plane = new Boat({ usage: false, hoursPerYear: 2 });
    expect(plane.annualFootprint).toBe(0);
  });

  it("should give an annual footprint of 79 kgCO2e with 8 hours per year", () => {
    const plane = new Boat({ usage: true, hoursPerYear: 8 });
    expect(plane.annualFootprint).toBe(79);
  });
});
