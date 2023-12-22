import { TwoWheeler } from "@domain/models/transport/two-wheeler/TwoWheeler";

describe("TwoWheeler", () => {
  it("should give an annual footprint of 0 kgCO2e if we don't use it", () => {
    const twoWheeler = new TwoWheeler({ usage: false });
    expect(twoWheeler.annualFootprint).toBe(0);
  });

  it("should give an annual footprint of 0 kgCO2e if we drive 0 km / year", () => {
    const twoWheeler = new TwoWheeler({ kmPerYear: 0 });
    expect(twoWheeler.annualFootprint).toBe(0);
  });

  it.each`
    type                 | kmPerYear | expectedAnnualFootprint
    ${"electricScooter"} | ${3000}   | ${93}
    ${"thermalScooter"}  | ${3000}   | ${233}
    ${"motorbikeLT250"}  | ${3000}   | ${233}
    ${"motorbikeGT250"}  | ${3000}   | ${577}
  `(
    `should give an annual footprint of $expectedAnnualFootprint kgCO2e if we drive $kmPerYear km / year with a $type`,
    ({ type, kmPerYear, expectedAnnualFootprint }) => {
      const twoWheeler = new TwoWheeler({ usage: true, type, kmPerYear });
      expect(twoWheeler.annualFootprint).toBe(expectedAnnualFootprint);
    },
  );
});
