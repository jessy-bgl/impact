import { render, screen, userEvent } from "@testing-library/react-native";
import { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ProfileCompletionCelebration } from "@carbonFootprint/view/screens/profile/ProfileCompletionCelebration";
import emissions from "@common/translations/fr/emissions.json";

import "@common/translations/i18n";

// moti pulls in reanimated's native worklets, unavailable under jest, and the
// animation wrappers are irrelevant to what this test asserts.
jest.mock("moti", () => ({
  MotiView: jest.requireActual("react-native").View,
}));

const mockNavigation = {
  popToTopCalls: 0,
  parentNavigations: [] as string[],
  reset() {
    mockNavigation.popToTopCalls = 0;
    mockNavigation.parentNavigations = [];
  },
  popToTop() {
    mockNavigation.popToTopCalls += 1;
  },
  getParent: () => ({
    navigate: (screenName: string) =>
      mockNavigation.parentNavigations.push(screenName),
  }),
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => mockNavigation,
}));

let dismissCalls = 0;

const renderCelebration = async () =>
  render(<ProfileCompletionCelebration visible onDismiss={onDismiss} />, {
    wrapper: Providers,
  });

const onDismiss = () => {
  dismissCalls += 1;
};

const Providers = ({ children }: PropsWithChildren) => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { x: 0, y: 0, width: 320, height: 640 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    }}
  >
    <PaperProvider>{children}</PaperProvider>
  </SafeAreaProvider>
);

describe("ProfileCompletionCelebration", () => {
  beforeEach(() => {
    dismissCalls = 0;
    mockNavigation.reset();
  });

  it("congratulates the user and offers both next steps", async () => {
    await renderCelebration();

    expect(
      screen.getByText(emissions.profileCompleted.title),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(emissions.profileCompleted.actionsEncouragement),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(emissions.profileCompleted.seeMyImpact),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(emissions.profileCompleted.discoverActions),
    ).toBeOnTheScreen();
  });

  it("compares the footprint to the French average", async () => {
    await renderCelebration();

    expect(
      screen.getByText(emissions.profileCompleted.frenchAverage.average),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(emissions.profileCompleted.frenchAverage.source),
    ).toBeOnTheScreen();
  });

  it("closes without navigating when dismissed", async () => {
    await renderCelebration();

    await userEvent.press(
      screen.getByLabelText(emissions.profileCompleted.close),
    );

    expect(dismissCalls).toBe(1);
    expect(mockNavigation.popToTopCalls).toBe(0);
    expect(mockNavigation.parentNavigations).toEqual([]);
  });

  it("goes back to the emissions summary from the primary action", async () => {
    await renderCelebration();

    await userEvent.press(
      screen.getByText(emissions.profileCompleted.seeMyImpact),
    );

    expect(dismissCalls).toBe(1);
    expect(mockNavigation.popToTopCalls).toBe(1);
    expect(mockNavigation.parentNavigations).toEqual([]);
  });

  it("opens the actions tab from the secondary action", async () => {
    await renderCelebration();

    await userEvent.press(
      screen.getByText(emissions.profileCompleted.discoverActions),
    );

    expect(dismissCalls).toBe(1);
    expect(mockNavigation.popToTopCalls).toBe(1);
    expect(mockNavigation.parentNavigations).toEqual(["Actions"]);
  });
});
