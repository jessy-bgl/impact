import { Digital } from "@domain/entities/categories/everyday-things/digital/Digital";

const fakeDigitals: Omit<
  Digital,
  "annualFootprint" | "occupants" | "preservation" | "internetAnnualFootprint"
> = {
  televisions: 1,
  laptops: 1,
  desktopComputers: 1,
  tablets: 1,
  videoProjectors: 1,
  cameras: 1,
  homeCinemas: 1,
  bluetoothSpeakers: 1,
  vocalSpeakers: 1,
  smartWatches: 1,
  gamingConsoles: 1,
  portableConsoles: 1,
  mobilePhones: 1,
  internetDailyHours: 1,
};

export const digitalDataset: {
  digital: Digital;
  expectedAnnualFootprint: number;
}[] = [
  {
    digital: new Digital({}),
    expectedAnnualFootprint: 101,
  },
  {
    digital: new Digital({
      ...fakeDigitals,
      occupants: 2,
      preservation: "none",
    }),
    expectedAnnualFootprint: 413,
  },
  {
    digital: new Digital({
      ...fakeDigitals,
      occupants: 2,
      preservation: "low",
    }),
    expectedAnnualFootprint: 310,
  },
  {
    digital: new Digital({
      ...fakeDigitals,
      occupants: 2,
      preservation: "medium",
    }),
    expectedAnnualFootprint: 207,
  },
  {
    digital: new Digital({
      ...fakeDigitals,
      occupants: 2,
      preservation: "high",
    }),
    expectedAnnualFootprint: 156,
  },
];
