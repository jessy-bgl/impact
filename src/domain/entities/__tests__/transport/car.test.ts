import { Car } from "@domain/entities/transport/car/Car";

describe("Car", () => {
  it("should give an annual footprint of 2239 kgCO2e with default values", () => {
    const car = new Car({});
    expect(car.annualFootprint).toBe(2239);
  });

  it("should give an annual footprint of 0 kgCO2e if we drive 0 km / year", () => {
    const car = new Car({ kmPerYear: 0 });
    expect(car.annualFootprint).toBe(0);
  });

  // TODO : ajouter d'autres tests
});
