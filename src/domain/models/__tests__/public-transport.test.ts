import { PublicTransport } from "../transport/public-transport/PublicTransport";

const testDataset = [
  {
    hoursPerYearInTrain: 0,
    hoursPerWeekInMetro: 0,
    hoursPerWeekInBus: 0,
    expectedAnnualFootprint: 0,
  },
  {
    hoursPerWeekInBus: 5,
    expectedAnnualFootprint: 353,
  },
  {
    hoursPerYearInTrain: 1000,
    expectedAnnualFootprint: 16,
  },
  {
    hoursPerWeekInMetro: 3,
    expectedAnnualFootprint: 13,
  },
  {
    hoursPerWeekInBus: 5,
    hoursPerYearInTrain: 1000,
    hoursPerWeekInMetro: 3,
    expectedAnnualFootprint: 381,
  },
];

describe("PublicTransport", () => {
  it.each(testDataset)(
    `should give an annual footprint of %i kgCO2e with %i hours per year in train, %i hours per week in metro and %i hours per week in bus`,
    ({
      hoursPerYearInTrain,
      hoursPerWeekInMetro,
      hoursPerWeekInBus,
      expectedAnnualFootprint,
    }) => {
      const publicTransport = new PublicTransport({
        hoursPerYearInTrain: hoursPerYearInTrain ?? 0,
        hoursPerWeekInMetro: hoursPerWeekInMetro ?? 0,
        hoursPerWeekInBus: hoursPerWeekInBus ?? 0,
      });
      expect(publicTransport.annualFootprint).toBe(expectedAnnualFootprint);
    },
  );
});
