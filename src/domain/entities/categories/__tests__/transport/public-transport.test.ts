import { PublicTransport } from "@domain/entities/categories/transport/public-transport/PublicTransport";

describe("PublicTransport", () => {
  it.each`
    hoursPerYearInTrain | hoursPerWeekInMetro | hoursPerWeekInBus | expectedAnnualFootprint
    ${0}                | ${0}                | ${0}              | ${0}
    ${0}                | ${0}                | ${5}              | ${353}
    ${1000}             | ${0}                | ${0}              | ${16}
    ${0}                | ${3}                | ${0}              | ${13}
    ${1000}             | ${3}                | ${5}              | ${381}
  `(
    `should give an annual footprint of $expectedAnnualFootprint kgCO2e with $hoursPerYearInTrain hours per year in train, $hoursPerWeekInMetro hours per week in metro and $hoursPerWeekInBus hours per week in bus`,
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
