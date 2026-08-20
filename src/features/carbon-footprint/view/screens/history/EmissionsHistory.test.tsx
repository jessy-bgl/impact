import { render, screen, userEvent } from "@testing-library/react-native";
import { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { FootprintsHistory } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { EmissionsHistory } from "@carbonFootprint/view/screens/history/EmissionsHistory";
import { defaultAppStoreValues } from "@common/store/storeDefaultValues";
import { useAppStore } from "@common/store/useStore";
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
    expect(
      screen.getByText(emissions.history.incompleteProfile.cta),
    ).toBeOnTheScreen();
  });

  it("shows the lone value when a single snapshot has been recorded", async () => {
    await renderHistory(history.slice(0, 1), { profileComplete: true });

    expect(
      screen.getByText(emissions.history.singleSnapshot.title),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(`11,70 ${emissions.history.perYear}`),
    ).toBeOnTheScreen();
  });

  describe("with a plottable history", () => {
    it("renders the chart and the current value", async () => {
      await renderHistory(history, { profileComplete: true });

      expect(screen.getByText(emissions.history.title)).toBeOnTheScreen();
      expect(
        screen.getByText(`10,20 ${emissions.history.perYear}`),
      ).toBeOnTheScreen();
    });

    // The default comparison is the previous point, not the first one.
    it("compares against the previous snapshot by default", async () => {
      await renderHistory(history, { profileComplete: true });

      expect(screen.getByText("depuis le 14 mai 2026")).toBeOnTheScreen();
      expect(screen.getByText("▼ −0,70 t (6 %)")).toBeOnTheScreen();
    });

    it("offers one filter chip per category plus the total", async () => {
      await renderHistory(history, { profileComplete: true });

      expect(screen.getByText(emissions.history.allFilter)).toBeOnTheScreen();
      expect(
        screen.getByText(`🚗 ${emissions.categories.transport}`),
      ).toBeOnTheScreen();
    });

    it("switches the plotted series when a category chip is picked", async () => {
      await renderHistory(history, { profileComplete: true });

      await userEvent.press(
        screen.getByText(`🚗 ${emissions.categories.transport}`),
      );

      // Transport alone: 2950 → 2750.
      expect(
        screen.getByText(`2,75 ${emissions.history.perYear}`),
      ).toBeOnTheScreen();
      expect(screen.getByText("▼ −0,20 t (7 %)")).toBeOnTheScreen();
    });

    it("hides the selection hint outside the total filter", async () => {
      await renderHistory(history, { profileComplete: true });
      expect(screen.getByText(emissions.history.selectHint)).toBeOnTheScreen();

      await userEvent.press(
        screen.getByText(`🚗 ${emissions.categories.transport}`),
      );

      expect(
        screen.queryByText(emissions.history.selectHint),
      ).not.toBeOnTheScreen();
    });

    it("selects a point to reveal its breakdown", async () => {
      await renderHistory(history, { profileComplete: true });

      await userEvent.press(
        screen.getByLabelText("Voir la répartition au 14 mai 2026"),
      );

      expect(screen.getByText("Répartition au 14 mai 2026")).toBeOnTheScreen();
      expect(screen.getByText("depuis le 14 mai 2026")).toBeOnTheScreen();
    });

    it("clears the selection when going back to the current date", async () => {
      await renderHistory(history, { profileComplete: true });

      await userEvent.press(
        screen.getByLabelText("Voir la répartition au 14 mai 2026"),
      );
      expect(screen.getByText("Répartition au 14 mai 2026")).toBeOnTheScreen();

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
