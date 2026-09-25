import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { PropsWithChildren, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  PROFILE_TOUR_CATEGORY_SCREENS,
  PROFILE_TOUR_HUB_SCREEN,
  PROFILE_TOUR_STEPS,
  PROFILE_TOUR_TARGETS,
} from "@carbonFootprint/domain/entities/tour/profileTour";
import { ProfileTourProvider } from "@carbonFootprint/view/tour/ProfileTourProvider";
import { useProfileTour } from "@carbonFootprint/view/tour/ProfileTourContext";
import { defaultAppStore } from "@common/store/store";
import { useAppStore } from "@common/store/useStore";
import { useTour, useTourRegistry } from "@common/tour/TourContext";
import { MeasurableNode, TargetRect } from "@common/tour/types";
import intro from "@common/translations/fr/intro.json";
import { Pressable, Text } from "react-native";

import "@common/translations/i18n";

const MEASURED_RECT: TargetRect = { x: 10, y: 300, width: 120, height: 40 };

type StubNode = MeasurableNode & { targetId: string };

/** Every anchor answers with the same rect: geometry is tested elsewhere. */
const measureStub = async (node: MeasurableNode) => {
  const { targetId } = node as StubNode;
  return Object.values(PROFILE_TOUR_TARGETS).includes(
    targetId as (typeof PROFILE_TOUR_TARGETS)[keyof typeof PROFILE_TOUR_TARGETS],
  )
    ? MEASURED_RECT
    : null;
};

const AllTargets = () => {
  const { registerTarget } = useTourRegistry();

  useEffect(() => {
    const unregisters = Object.values(PROFILE_TOUR_TARGETS).map((targetId) =>
      registerTarget(targetId, { targetId } as StubNode),
    );
    return () => unregisters.forEach((unregister) => unregister());
  }, [registerTarget]);

  return null;
};

const TourProbe = () => {
  const { step, status } = useTour();
  const { completeStep } = useTourRegistry();
  const { startTour, isRunning } = useProfileTour();

  return (
    <>
      <Text testID="stepId">{step?.id ?? "none"}</Text>
      <Text testID="status">{status}</Text>
      <Text testID="running">{String(isRunning)}</Text>
      <Pressable testID="help" onPress={() => startTour("help_icon")}>
        <Text>help</Text>
      </Pressable>
      {/* Stands in for the user acting on the spotlighted element. */}
      <Pressable testID="act" onPress={() => step && completeStep(step.id)}>
        <Text>act</Text>
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

const tree = (currentScreen: string) => (
  <ProfileTourProvider currentScreen={currentScreen} measure={measureStub}>
    <AllTargets />
    <TourProbe />
  </ProfileTourProvider>
);

const renderProfileTour = async (currentScreen = PROFILE_TOUR_HUB_SCREEN) => {
  const utils = await render(tree(currentScreen), { wrapper: Providers });
  return {
    ...utils,
    update: (nextScreen: string) => utils.rerender(tree(nextScreen)),
  };
};

const stepIdText = () => screen.getByTestId("stepId").props.children;
const statusText = () => screen.getByTestId("status").props.children;

/** The card only takes presses once its target has come to rest. */
const waitForShownStep = (stepId: string) =>
  waitFor(() => {
    expect(stepIdText()).toBe(stepId);
    expect(statusText()).toBe("visible");
  });

const nav = intro.tour.nav;

const firstStepId = PROFILE_TOUR_STEPS[0].id;
const handoverStepId = PROFILE_TOUR_STEPS.find(
  (step) => step.advance === "screenChange",
)!.id;
const firstCategoryStepId = PROFILE_TOUR_STEPS.find(
  (step) => !step.screens.includes(PROFILE_TOUR_HUB_SCREEN),
)!.id;

describe("ProfileTourProvider", () => {
  beforeEach(() => {
    useAppStore.setState(defaultAppStore(), true);
  });

  it("starts the tour on first arrival", async () => {
    await renderProfileTour();

    await waitFor(() => expect(stepIdText()).toBe(firstStepId));
  });

  it("stays out of the way once the tour has been seen", async () => {
    useAppStore.setState((state) => ({
      ...state,
      shouldShowIntro: { ...state.shouldShowIntro, profile: false },
    }));

    await renderProfileTour();

    expect(stepIdText()).toBe("none");
  });

  it("replays the tour on demand once it has been seen", async () => {
    useAppStore.setState((state) => ({
      ...state,
      shouldShowIntro: { ...state.shouldShowIntro, profile: false },
    }));
    await renderProfileTour();

    await userEvent.press(screen.getByTestId("help"));

    expect(stepIdText()).toBe(firstStepId);
  });

  it("replays from the step of the screen the user asked from", async () => {
    useAppStore.setState((state) => ({
      ...state,
      shouldShowIntro: { ...state.shouldShowIntro, profile: false },
    }));
    await renderProfileTour(PROFILE_TOUR_CATEGORY_SCREENS[0]);

    await userEvent.press(screen.getByTestId("help"));

    expect(stepIdText()).toBe(firstCategoryStepId);
  });

  it("resumes inside the category the user opened", async () => {
    const { update } = await renderProfileTour();
    await waitFor(() => expect(stepIdText()).toBe(firstStepId));

    await update(PROFILE_TOUR_CATEGORY_SCREENS[0]);

    await waitFor(() => expect(stepIdText()).toBe(firstCategoryStepId));
  });

  it("stops asking once the user has walked the whole tour", async () => {
    const { update } = await renderProfileTour();
    await waitFor(() => expect(stepIdText()).toBe(firstStepId));

    const hubSteps = PROFILE_TOUR_STEPS.filter((step) =>
      step.screens.includes(PROFILE_TOUR_HUB_SCREEN),
    );
    for (const [index, step] of hubSteps.entries()) {
      await waitForShownStep(step.id);
      if (index < hubSteps.length - 1)
        await userEvent.press(screen.getByText(nav.next));
    }

    await update(PROFILE_TOUR_CATEGORY_SCREENS[0]);
    await waitFor(() => expect(stepIdText()).toBe(firstCategoryStepId));

    const categorySteps = PROFILE_TOUR_STEPS.filter(
      (step) => !step.screens.includes(PROFILE_TOUR_HUB_SCREEN),
    );
    for (const [index, step] of categorySteps.entries()) {
      await waitForShownStep(step.id);
      const isLastStep = index === categorySteps.length - 1;
      if (step.advance === "action")
        await userEvent.press(screen.getByTestId("act"));
      else
        await userEvent.press(
          screen.getByText(isLastStep ? nav.finish : nav.next),
        );
    }

    expect(stepIdText()).toBe("none");
    expect(useAppStore.getState().shouldShowIntro.profile).toBe(false);
  });

  it("stops asking once the user has dismissed the tour", async () => {
    await renderProfileTour();
    await waitForShownStep(firstStepId);

    await userEvent.press(screen.getByLabelText(nav.close));

    expect(stepIdText()).toBe("none");
    expect(useAppStore.getState().shouldShowIntro.profile).toBe(false);
  });

  it("goes back to inviting the user in when they leave the category", async () => {
    const { update } = await renderProfileTour();
    await waitFor(() => expect(stepIdText()).toBe(firstStepId));
    await update(PROFILE_TOUR_CATEGORY_SCREENS[0]);
    await waitFor(() => expect(stepIdText()).toBe(firstCategoryStepId));

    await update(PROFILE_TOUR_HUB_SCREEN);

    expect(stepIdText()).toBe(handoverStepId);
  });
});
