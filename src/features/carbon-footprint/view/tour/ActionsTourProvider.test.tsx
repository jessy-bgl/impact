import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { PropsWithChildren, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { completableSubCategories } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import {
  ACTIONS_TOUR_SCREEN,
  ACTIONS_TOUR_STEPS,
  ACTIONS_TOUR_TARGETS,
} from "@carbonFootprint/domain/entities/tour/actionsTour";
import { useActionsTour } from "@carbonFootprint/view/tour/ActionsTourContext";
import { ActionsTourProvider } from "@carbonFootprint/view/tour/ActionsTourProvider";
import { AppStore, defaultAppStore } from "@common/store/store";
import { useAppStore } from "@common/store/useStore";
import { useTour, useTourRegistry } from "@common/tour/TourContext";
import { MeasurableNode, TargetRect } from "@common/tour/types";
import intro from "@common/translations/fr/intro.json";

import "@common/translations/i18n";

const MEASURED_RECT: TargetRect = { x: 10, y: 300, width: 120, height: 40 };

type StubNode = MeasurableNode & { targetId: string };

/** Every anchor answers with the same rect: geometry is tested elsewhere. */
const measureStub = async () => MEASURED_RECT;

const AllTargets = () => {
  const { registerTarget } = useTourRegistry();

  useEffect(() => {
    const unregisters = Object.values(ACTIONS_TOUR_TARGETS).map((targetId) =>
      registerTarget(targetId, { targetId } as StubNode),
    );
    return () => unregisters.forEach((unregister) => unregister());
  }, [registerTarget]);

  return null;
};

const TourProbe = () => {
  const { step, stepCount } = useTour();
  const { startTour } = useActionsTour();

  return (
    <>
      <Text testID="stepId">{step?.id ?? "none"}</Text>
      <Text testID="stepCount">{String(stepCount)}</Text>
      <Pressable testID="help" onPress={() => startTour("help_icon")}>
        <Text>help</Text>
      </Pressable>
    </>
  );
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

const renderActionsTour = () =>
  render(
    <ActionsTourProvider
      currentScreen={ACTIONS_TOUR_SCREEN}
      measure={measureStub}
    >
      <AllTargets />
      <TourProbe />
    </ActionsTourProvider>,
    { wrapper: Providers },
  );

const stepIdText = () => screen.getByTestId("stepId").props.children;
const stepCountText = () => screen.getByTestId("stepCount").props.children;

const nav = intro.tour.nav;

const firstStepId = ACTIONS_TOUR_STEPS[0].id;

const markActionsTourSeen = () =>
  useAppStore.setState((state) => ({
    ...state,
    shouldShowIntro: { ...state.shouldShowIntro, actions: false },
  }));

const completeProfile = () =>
  useAppStore.setState((state) => ({
    ...state,
    profile: {
      ...state.profile,
      completion: Object.fromEntries(
        Object.entries(completableSubCategories).map(
          ([category, subCategories]) => [
            category,
            Object.fromEntries(
              subCategories.map((subCategory) => [subCategory, true]),
            ),
          ],
        ),
      ) as AppStore["profile"]["completion"],
    },
  }));

describe("ActionsTourProvider", () => {
  beforeEach(() => {
    useAppStore.setState(defaultAppStore(), true);
  });

  it("starts the tour on first arrival", async () => {
    await renderActionsTour();

    await waitFor(() => expect(stepIdText()).toBe(firstStepId));
  });

  it("stays out of the way once the tour has been seen", async () => {
    markActionsTourSeen();

    await renderActionsTour();

    expect(stepIdText()).toBe("none");
  });

  it("replays the tour on demand once it has been seen", async () => {
    markActionsTourSeen();
    await renderActionsTour();

    await userEvent.press(screen.getByTestId("help"));

    expect(stepIdText()).toBe(firstStepId);
  });

  it("invites the user to complete an unfinished profile", async () => {
    await renderActionsTour();
    await waitFor(() => expect(stepIdText()).toBe(firstStepId));

    expect(stepCountText()).toBe(String(ACTIONS_TOUR_STEPS.length));
  });

  it("skips that invitation once the profile is complete", async () => {
    completeProfile();
    await renderActionsTour();
    await waitFor(() => expect(stepIdText()).toBe(firstStepId));

    expect(stepCountText()).toBe(String(ACTIONS_TOUR_STEPS.length - 1));
  });

  it("stops asking once the user has walked the whole tour", async () => {
    await renderActionsTour();

    for (const [index, step] of ACTIONS_TOUR_STEPS.entries()) {
      await waitFor(() => expect(stepIdText()).toBe(step.id));
      const isLastStep = index === ACTIONS_TOUR_STEPS.length - 1;
      await userEvent.press(
        await screen.findByText(isLastStep ? nav.finish : nav.next),
      );
    }

    expect(stepIdText()).toBe("none");
    expect(useAppStore.getState().shouldShowIntro.actions).toBe(false);
  });

  it("stops asking once the user has dismissed the tour", async () => {
    await renderActionsTour();
    await waitFor(() => expect(stepIdText()).toBe(firstStepId));

    await userEvent.press(screen.getByLabelText(nav.close));

    expect(stepIdText()).toBe("none");
    expect(useAppStore.getState().shouldShowIntro.actions).toBe(false);
  });
});
