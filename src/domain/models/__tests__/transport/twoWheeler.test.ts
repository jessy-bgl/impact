import { TwoWheeler } from "@domain/models/transport/two-wheeler/TwoWheeler";

describe("TwoWheeler", () => {
  it("should consider we are not using it by default", () => {
    const twoWheeler = new TwoWheeler({});
    expect(twoWheeler.usage).toBeFalsy();
    expect(twoWheeler.kmPerYear).toBe(0);
  });

  it("should give a default annual footprint of 0 kgCO2e if we drive 0 km / year", () => {
    const twoWheeler = new TwoWheeler({ kmPerYear: 0 });
    expect(twoWheeler.annualFootprint).toBe(0);
  });

  it("should give a default annual footprint of 0 kgCO2e if we don't use it", () => {
    const twoWheeler = new TwoWheeler({ usage: false });
    expect(twoWheeler.annualFootprint).toBe(0);
  });

  // TODO : ajouter d'autres tests
});
