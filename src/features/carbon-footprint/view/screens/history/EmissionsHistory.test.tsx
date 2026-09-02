import { render, screen, userEvent } from "@testing-library/react-native";
import { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { FootprintsHistory } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { EmissionsHistory } from "@carbonFootprint/view/screens/history/EmissionsHistory";
import { historyChartPreviewTestId } from "@carbonFootprint/view/screens/history/HistoryChartPreview";
import { defaultAppStoreValues } from "@common/store/storeDefaultValues";
import { useAppStore } from "@common/store/useStore";
import common from "@common/translations/fr/common.json";
import emissions from "@common/translations/fr/emissions.json";

import "@common/translations/i18n";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: () => {} }),
}));

// `gifted-charts-core` ships ESM that the shared `transformIgnorePatterns` does
// not cover. The chart's own props are checked by `tsc` against the package's
// types, so nothing is lost by leaving the drawing out of this test.
jest.mock("react-native-gifted-charts", () => ({
  LineChart: () => null,
}));

// The real modal only lays out through Reanimated, which never runs here, so
// the filter sheet's content would never mount. `jest.mock` factories are
// hoisted above the imports, hence the `require`.
jest.mock("@gorhom/bottom-sheet", () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("@common/test/gorhomBottomSheetStub"),
);

// The trigger names the active filter, so it is matched on the invariant part
// of its label rather than on whichever filter happens to be selected.
const openFilterSheet = () =>
  userEvent.press(
    screen.getByLabelText(
      new RegExp(`^${emissions.history.filterA11y.replace("{{filter}}", "")}`),
    ),
  );

const pickFilter = async (label: string) => {
  await openFilterSheet();
  await userEvent.press(screen.getByText(label));
};

const snapshot = (
  date: string,
  transport: number,
  food: number,
  housing: number,
  everydayThings: number,
  societalServices: number,
) => ({
  date,
  footprints: { transport, food, housing, everydayThings, societalServices },
});

// 11700 → 10900 → 10200
const history: FootprintsHistory = [
  snapshot("2026-03-12", 3100, 2400, 3500, 1200, 1500),
  snapshot("2026-05-14", 2950, 2100, 3200, 1150, 1500),
  snapshot("2026-08-18", 2750, 2000, 2900, 1050, 1500),
];

const Providers = ({ children }: PropsWithChildren) => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { x: 0, y: 0, width: 390, height: 844 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    }}
  >
    <PaperProvider>{children}</PaperProvider>
  </SafeAreaProvider>
);

const completeProfile = () =>
  Object.values(profileSections).reduce(
    (completion, { category, subCategory }) => ({
      ...completion,
      [category]: { ...completion[category], [subCategory]: true },
    }),
    structuredClone(defaultAppStoreValues.profile.completion),
  );

const renderHistory = async (
  footprintsHistory: FootprintsHistory,
  { profileComplete }: { profileComplete: boolean },
) => {
  useAppStore.setState((state) => ({
    ...state,
    footprintsHistory,
    profile: {
      ...state.profile,
      completion: profileComplete
        ? completeProfile()
        : structuredClone(defaultAppStoreValues.profile.completion),
    },
  }));

  return await render(<EmissionsHistory />, { wrapper: Providers });
};

describe("EmissionsHistory", () => {
  it("invites the user to complete their profile while tracking has not started", async () => {
    await renderHistory([], { profileComplete: false });

    expect(
      screen.getByText(emissions.history.incompleteProfile.title),
    ).toBeOnTheScreen();
    // Nothing answered yet, so the shared button words itself as a first go.
    expect(screen.getByText(emissions.estimate)).toBeOnTheScreen();
    expect(screen.getByTestId(historyChartPreviewTestId)).toBeOnTheScreen();
  });

  it("shows the lone value when a single snapshot has been recorded", async () => {
    await renderHistory(history.slice(0, 1), { profileComplete: true });

    expect(
      screen.getByText(emissions.history.singleSnapshot.title),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(`11,70 ${emissions.history.perYear}`),
    ).toBeOnTheScreen();
    expect(screen.getByTestId(historyChartPreviewTestId)).toBeOnTheScreen();
    // Updating the profile is what writes the second snapshot, so the way out
    // of this state is the same button the distribution screen offers.
    expect(screen.getByText(emissions.updateEstimate)).toBeOnTheScreen();
  });

  describe("with a plottable history", () => {
    it("renders the chart and the current value", async () => {
      await renderHistory(history, { profileComplete: true });

      expect(screen.getByText(emissions.history.title)).toBeOnTheScreen();
      expect(
        screen.getByText(`10,20 ${emissions.history.perYear}`),
      ).toBeOnTheScreen();
      expect(
        screen.queryByTestId(historyChartPreviewTestId),
      ).not.toBeOnTheScreen();
    });

    // The default comparison is the previous point, not the first one.
    it("compares against the previous snapshot by default", async () => {
      await renderHistory(history, { profileComplete: true });

      expect(screen.getByText("depuis le 14 mai 2026")).toBeOnTheScreen();
      expect(screen.getByText("▼ −0,70 t (6 %)")).toBeOnTheScreen();
    });

    // The filter is collapsed behind a single trigger: on a phone, a chip per
    // category wrapped over three rows and pushed the chart below the fold.
    it("offers one filter row per category plus the total, in a sheet", async () => {
      await renderHistory(history, { profileComplete: true });

      expect(
        screen.queryByText(emissions.categories.transport),
      ).not.toBeOnTheScreen();

      await openFilterSheet();

      // By name, not by text: the trigger also spells out the active filter.
      expect(
        screen.getByRole("button", { name: emissions.history.allFilter }),
      ).toBeOnTheScreen();
      expect(
        screen.getByRole("button", { name: emissions.categories.transport }),
      ).toBeOnTheScreen();
    });

    it("switches the plotted series when a category is picked", async () => {
      await renderHistory(history, { profileComplete: true });

      await pickFilter(emissions.categories.transport);

      // Transport alone: 2950 → 2750.
      expect(
        screen.getByText(`2,75 ${emissions.history.perYear}`),
      ).toBeOnTheScreen();
      expect(screen.getByText("▼ −0,20 t (7 %)")).toBeOnTheScreen();
    });

    // Under a category filter the point still has a value and a comparison to
    // show; only the split, which the total alone has, is left out.
    it("selects a point under a category filter, without a breakdown", async () => {
      await renderHistory(history, { profileComplete: true });

      await pickFilter(emissions.categories.transport);
      await userEvent.press(
        screen.getByLabelText("Voir le détail au 14 mai 2026"),
      );

      expect(screen.getByText("14 mai 2026")).toBeOnTheScreen();
      expect(
        screen.getByText(`2,95 ${emissions.history.perYear}`),
      ).toBeOnTheScreen();
      expect(screen.getByText("▲ +0,20 t (7 %)")).toBeOnTheScreen();
      expect(
        screen.getByText(emissions.history.comparedToCurrent),
      ).toBeOnTheScreen();

      // The sheet lists every category by name, so the split is looked for by
      // one of its values instead.
      expect(
        screen.queryByText(`2950 ${common.footprintKg}`),
      ).not.toBeOnTheScreen();
    });

    // One card holds the whole story of the selected point: its own total, how
    // today compares to it, and its category split.
    it("selects a point to reveal its total, its variation and its breakdown", async () => {
      await renderHistory(history, { profileComplete: true });

      await userEvent.press(
        screen.getByLabelText("Voir le détail au 14 mai 2026"),
      );

      expect(screen.getByText("14 mai 2026")).toBeOnTheScreen();
      expect(
        screen.getByText(`10,90 ${emissions.history.perYear}`),
      ).toBeOnTheScreen();
      // That date sat above today's footprint, so it reads as a plus.
      expect(screen.getByText("▲ +0,70 t (7 %)")).toBeOnTheScreen();
      expect(
        screen.getByText(emissions.history.comparedToCurrent),
      ).toBeOnTheScreen();
      expect(
        screen.getByText(emissions.categories.transport),
      ).toBeOnTheScreen();
      expect(screen.getByText(`3200 ${common.footprintKg}`)).toBeOnTheScreen();
    });

    it("replaces the current-value card while a point is selected", async () => {
      await renderHistory(history, { profileComplete: true });

      await userEvent.press(
        screen.getByLabelText("Voir le détail au 14 mai 2026"),
      );

      expect(
        screen.queryByText(`10,20 ${emissions.history.perYear}`),
      ).not.toBeOnTheScreen();
      expect(screen.queryByText("depuis le 14 mai 2026")).not.toBeOnTheScreen();
    });

    it("clears the selection when going back to the current date", async () => {
      await renderHistory(history, { profileComplete: true });

      await userEvent.press(
        screen.getByLabelText("Voir le détail au 14 mai 2026"),
      );
      expect(
        screen.getByText(emissions.categories.transport),
      ).toBeOnTheScreen();

      await userEvent.press(
        screen.getByText(emissions.history.backToCurrentDate),
      );

      expect(
        screen.queryByText("Répartition au 14 mai 2026"),
      ).not.toBeOnTheScreen();
      expect(screen.getByText(emissions.history.selectHint)).toBeOnTheScreen();
    });
  });
});
