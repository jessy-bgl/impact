import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { Footprints } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import {
  buildSnapshot,
  FootprintSnapshot,
  haveSameFootprints,
  parseDayKey,
  toDayKey,
  totalOf,
  upsertSnapshot,
} from "@carbonFootprint/domain/entities/history/FootprintSnapshot";

const snapshot = (
  date: string,
  transport: number,
  food = 0,
  housing = 0,
  everydayThings = 0,
  societalServices = 0,
): FootprintSnapshot => ({
  date,
  footprints: {
    transport,
    food,
    housing,
    everydayThings,
    societalServices,
  },
});

describe("toDayKey", () => {
  it.each([
    ["2026-03-12T10:00:00", "2026-03-12"],
    ["2026-01-05T00:00:00", "2026-01-05"],
    ["2026-12-31T23:59:59", "2026-12-31"],
  ])("maps %s to %s", (input, expected) => {
    expect(toDayKey(new Date(input))).toBe(expected);
  });

  // The regression this guards: an evening answer in summer is already the next
  // day in UTC, so `toISOString().slice(0, 10)` would file it under 19 August.
  it("keys on the local day, not the UTC day", () => {
    const summerEvening = new Date(2026, 7, 18, 23, 30);

    expect(toDayKey(summerEvening)).toBe("2026-08-18");
  });
});

describe("parseDayKey", () => {
  it.each(["2026-03-12", "2026-01-05", "2026-12-31"])(
    "round-trips %s through toDayKey",
    (dayKey) => {
      expect(toDayKey(parseDayKey(dayKey))).toBe(dayKey);
    },
  );

  it("builds a local midnight, so formatting never shifts the day", () => {
    const date = parseDayKey("2026-03-12");

    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([
      2026, 2, 12,
    ]);
    expect(date.getHours()).toBe(0);
  });
});

describe("totalOf", () => {
  it("sums every category", () => {
    expect(totalOf(snapshot("2026-03-12", 3100, 2400, 3500, 1200, 1500))).toBe(
      11700,
    );
  });
});

describe("haveSameFootprints", () => {
  it("ignores the date", () => {
    expect(
      haveSameFootprints(
        snapshot("2026-03-12", 100),
        snapshot("2026-05-14", 100),
      ),
    ).toBe(true);
  });

  it("is false as soon as one category differs", () => {
    expect(
      haveSameFootprints(
        snapshot("2026-03-12", 100, 200),
        snapshot("2026-03-12", 100, 201),
      ),
    ).toBe(false);
  });
});

describe("buildSnapshot", () => {
  const footprints = (): Footprints => ({
    transport: new TransportFootprint({ carFootprint: 3100 }),
    food: new FoodFootprint({ mealsFootprint: 2400 }),
    housing: new HousingFootprint({ homeFootprint: 3500 }),
    everydayThings: new EverydayThingsFootprint({ clothesFootprint: 1200 }),
    societalServices: new SocietalServicesFootprint({
      publicServicesFootprint: 1500,
    }),
  });

  it("reads the annual footprint of every category", () => {
    expect(buildSnapshot("2026-03-12", footprints())).toEqual(
      snapshot("2026-03-12", 3100, 2400, 3500, 1200, 1500),
    );
  });

  // What a rehydrated store looks like: plain objects whose `annualFootprint`
  // getter did not survive JSON serialisation.
  it("returns null when a category total is not a finite number", () => {
    const rehydrated = {
      ...footprints(),
      housing: { homeFootprint: 3500 } as unknown as HousingFootprint,
    };

    expect(buildSnapshot("2026-03-12", rehydrated)).toBeNull();
  });
});

describe("upsertSnapshot", () => {
  it("appends the first snapshot to an empty history", () => {
    expect(upsertSnapshot([], snapshot("2026-03-12", 100))).toEqual([
      snapshot("2026-03-12", 100),
    ]);
  });

  it("appends a new day whose footprints changed", () => {
    const history = [snapshot("2026-03-12", 100)];

    expect(upsertSnapshot(history, snapshot("2026-05-14", 90))).toEqual([
      snapshot("2026-03-12", 100),
      snapshot("2026-05-14", 90),
    ]);
  });

  it("replaces the day's entry when the value changed on the same day", () => {
    const history = [snapshot("2026-03-12", 100), snapshot("2026-05-14", 90)];

    expect(upsertSnapshot(history, snapshot("2026-05-14", 80))).toEqual([
      snapshot("2026-03-12", 100),
      snapshot("2026-05-14", 80),
    ]);
  });

  it("returns the same reference for a new day with unchanged footprints", () => {
    const history = [snapshot("2026-03-12", 100)];

    expect(upsertSnapshot(history, snapshot("2026-05-14", 100))).toBe(history);
  });

  it("returns the same reference when re-recording the day with the same value", () => {
    const history = [snapshot("2026-03-12", 100), snapshot("2026-05-14", 90)];

    expect(upsertSnapshot(history, snapshot("2026-05-14", 90))).toBe(history);
  });

  // Answering, then undoing the answer within the same day must not leave two
  // consecutive identical points behind.
  it("drops the day's entry when it is edited back to the previous day's value", () => {
    const history = [snapshot("2026-03-12", 100), snapshot("2026-05-14", 90)];

    expect(upsertSnapshot(history, snapshot("2026-05-14", 100))).toEqual([
      snapshot("2026-03-12", 100),
    ]);
  });

  it("never mutates the history it is given", () => {
    const history = [snapshot("2026-03-12", 100)];

    upsertSnapshot(history, snapshot("2026-05-14", 90));

    expect(history).toEqual([snapshot("2026-03-12", 100)]);
  });
});
