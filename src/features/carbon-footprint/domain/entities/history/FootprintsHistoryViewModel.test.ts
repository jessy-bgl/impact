import {
  FootprintSnapshot,
  MIN_SNAPSHOTS_FOR_CHART,
} from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import { buildFootprintsHistoryViewModel } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";

const snapshot = (
  date: string,
  transport: number,
  food = 0,
  housing = 0,
  everydayThings = 0,
  societalServices = 0,
): FootprintSnapshot => ({
  date,
  footprints: { transport, food, housing, everydayThings, societalServices },
});

// 11700 → 10900 → 10200 in total; transport alone goes 3100 → 2950 → 2750.
const history = [
  snapshot("2026-03-12", 3100, 2400, 3500, 1200, 1500),
  snapshot("2026-05-14", 2950, 2100, 3200, 1150, 1500),
  snapshot("2026-08-18", 2750, 2000, 2900, 1050, 1500),
];

describe("buildFootprintsHistoryViewModel", () => {
  describe("not enough data", () => {
    it.each(
      Array.from({ length: MIN_SNAPSHOTS_FOR_CHART }, (_, length) => length),
    )("reports hasEnoughData=false with %i snapshot(s)", (length) => {
      const viewModel = buildFootprintsHistoryViewModel(
        history.slice(0, length),
        "all",
        null,
      );

      expect(viewModel.hasEnoughData).toBe(false);
      expect(viewModel.variation).toBeNull();
    });

    it("still exposes the value of a lone snapshot", () => {
      expect(
        buildFootprintsHistoryViewModel(history.slice(0, 1), "all", null)
          .currentValue,
      ).toBe(11700);
    });
  });

  describe('filter "all"', () => {
    it("plots the totals", () => {
      expect(
        buildFootprintsHistoryViewModel(history, "all", null).points,
      ).toEqual([
        { date: "2026-03-12", value: 11700 },
        { date: "2026-05-14", value: 10900 },
        { date: "2026-08-18", value: 10200 },
      ]);
    });

    it("compares the last two points when nothing is selected", () => {
      const { variation, selection } = buildFootprintsHistoryViewModel(
        history,
        "all",
        null,
      );

      expect(variation).toEqual({
        fromDate: "2026-05-14",
        deltaKg: -700,
        percentage: 6,
        trend: "down",
      });
      expect(selection).toBeNull();
    });

    // The card built on it describes the selected date, not today, so the sign
    // has to point the other way: emissions used to be 700 kg higher.
    it("exposes the selected point's value, mirroring the comparison", () => {
      const { selection } = buildFootprintsHistoryViewModel(
        history,
        "all",
        "2026-05-14",
      );

      expect(selection).toMatchObject({
        date: "2026-05-14",
        value: 10900,
        variation: {
          fromDate: "2026-08-18",
          deltaKg: 700,
          percentage: 7,
          trend: "up",
        },
      });
    });

    it("compares the selected point against the latest one", () => {
      const { variation, selection } = buildFootprintsHistoryViewModel(
        history,
        "all",
        "2026-03-12",
      );

      expect(variation).toEqual({
        fromDate: "2026-03-12",
        deltaKg: -1500,
        percentage: 13,
        trend: "down",
      });
      expect(selection?.date).toBe("2026-03-12");
    });

    it("exposes the category split of the selected point, summing to 100%", () => {
      const { selection } = buildFootprintsHistoryViewModel(
        history,
        "all",
        "2026-03-12",
      );
      const breakdown = selection?.breakdown;

      expect(breakdown?.transport.footprint).toBe(3100);
      expect(breakdown?.housing.footprint).toBe(3500);
      expect(
        Object.values(breakdown!).reduce((sum, { part }) => sum + part, 0),
      ).toBe(100);
    });

    // Selecting it would compare the value against itself.
    it("ignores a selection on the latest point", () => {
      const { selection, variation } = buildFootprintsHistoryViewModel(
        history,
        "all",
        "2026-08-18",
      );

      expect(selection).toBeNull();
      expect(variation?.fromDate).toBe("2026-05-14");
    });

    it("ignores a selection on a date the history no longer holds", () => {
      const { selection } = buildFootprintsHistoryViewModel(
        history,
        "all",
        "2025-01-01",
      );

      expect(selection).toBeNull();
    });
  });

  describe("category filter", () => {
    it("plots that category only", () => {
      expect(
        buildFootprintsHistoryViewModel(history, "transport", null).points,
      ).toEqual([
        { date: "2026-03-12", value: 3100 },
        { date: "2026-05-14", value: 2950 },
        { date: "2026-08-18", value: 2750 },
      ]);
    });

    it("computes the variation on that category", () => {
      expect(
        buildFootprintsHistoryViewModel(history, "transport", null).variation,
      ).toEqual({
        fromDate: "2026-05-14",
        deltaKg: -200,
        percentage: 7,
        trend: "down",
      });
    });

    it("keeps the selection, on that category's value", () => {
      const { selection } = buildFootprintsHistoryViewModel(
        history,
        "transport",
        "2026-03-12",
      );

      expect(selection).toMatchObject({
        date: "2026-03-12",
        value: 3100,
        variation: {
          fromDate: "2026-08-18",
          deltaKg: 350,
          percentage: 13,
          trend: "up",
        },
      });
    });

    it("has no split to show, only the total splits into categories", () => {
      const { selection } = buildFootprintsHistoryViewModel(
        history,
        "transport",
        "2026-03-12",
      );

      expect(selection?.breakdown).toBeNull();
    });
  });

  describe("trend", () => {
    // The percentage is always relative to the reference point, so the same
    // 50 kg move reads differently depending on which way it goes.
    it.each([
      ["up", 100, 150, 50],
      ["down", 150, 100, 33],
      ["stable", 100, 100, 0],
    ] as const)("is %s", (trend, before, after, percentage) => {
      const { variation } = buildFootprintsHistoryViewModel(
        [snapshot("2026-03-12", before), snapshot("2026-05-14", after)],
        "transport",
        null,
      );

      expect(variation).toMatchObject({ trend, percentage });
    });

    it("reports 0 % rather than Infinity when growing from zero", () => {
      const { variation } = buildFootprintsHistoryViewModel(
        [snapshot("2026-03-12", 0), snapshot("2026-05-14", 500)],
        "transport",
        null,
      );

      expect(variation).toMatchObject({
        trend: "up",
        deltaKg: 500,
        percentage: 0,
      });
    });
  });
});
