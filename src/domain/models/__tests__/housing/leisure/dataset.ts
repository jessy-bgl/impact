import { Leisure } from "@domain/models/housing/leisure/Leisure";

export const poolDataset: {
  leisure: Leisure;
  expectedPoolAnnualFootprint: number;
}[] = [
  {
    leisure: new Leisure({ hasIngroundPool: false }),
    expectedPoolAnnualFootprint: 0,
  },
  {
    leisure: new Leisure({ isAnApartment: true }),
    expectedPoolAnnualFootprint: 0,
  },
  {
    leisure: new Leisure({
      isAnApartment: false,
      hasIngroundPool: true,
      occupants: 3,
    }),
    expectedPoolAnnualFootprint: 69,
  },
];

export const holidaysDataset: {
  leisure: Leisure;
  expectedHolidaysAnnualFootprint: number;
}[] = [
  {
    leisure: new Leisure({ occupants: 2 }),
    expectedHolidaysAnnualFootprint: 0,
  },
  {
    leisure: new Leisure({
      occupants: 2,
      holidayAccomodations: {
        hotel: true,
        camping: true,
        youthHostel: true,
        rentals: true,
        exchange: true,
      },
      campingNightsPerYear: 0,
      hotelNightsPerYear: 0,
      youthHostelNightsPerYear: 0,
      rentalNightsPerYear: 0,
      exchangeNightsPerYear: 0,
    }),
    expectedHolidaysAnnualFootprint: 0,
  },
  {
    leisure: new Leisure({
      occupants: 2,
      holidayAccomodations: {
        hotel: true,
        camping: true,
        youthHostel: true,
        rentals: true,
        exchange: true,
      },
      campingNightsPerYear: 2,
      hotelNightsPerYear: 2,
      youthHostelNightsPerYear: 2,
      rentalNightsPerYear: 2,
      exchangeNightsPerYear: 2,
    }),
    expectedHolidaysAnnualFootprint: 20,
  },
];
