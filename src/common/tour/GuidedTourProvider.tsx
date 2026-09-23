import {
  Context,
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { UsecasesContext } from "@common/context/UsecasesContext";
import { useCurrentScreen } from "@common/tour/currentScreen";
import {
  GuidedTourContextValue,
  TourTrigger,
} from "@common/tour/GuidedTourContext";
import { GuidedTourOverlay } from "@common/tour/GuidedTourOverlay";
import {
  TourFinishInfo,
  TourProvider,
  TourStartOptions,
  useTour,
} from "@common/tour/TourContext";
import { AUTO_START_DELAY_MS } from "@common/tour/tourConstants";
import {
  MeasurableNode,
  SkipReason,
  TargetRect,
  TourStep,
} from "@common/tour/types";
import { AnalyticsProperties } from "@consent/domain/entities/Analytics";

type ControllerProps = PropsWithChildren<{
  context: Context<GuidedTourContextValue>;
  steps: TourStep[];
  triggerRef: RefObject<TourTrigger>;
  currentScreen?: string;
  shouldAutoStart: boolean;
}>;

const TourController = ({
  context: GuidedTourContext,
  steps,
  triggerRef,
  currentScreen,
  shouldAutoStart,
  children,
}: ControllerProps) => {
  const { start, isRunning } = useTour();

  const hasAutoStarted = useRef(false);

  const isTourScreen =
    currentScreen !== undefined &&
    steps.some((step) => step.screens.includes(currentScreen));

  const startTour = useCallback(
    (trigger: TourTrigger, options?: TourStartOptions) => {
      triggerRef.current = trigger;
      start(options);
    },
    [start, triggerRef],
  );

  // Lets the screen settle and be seen before the tour takes over.
  useEffect(() => {
    if (!shouldAutoStart || hasAutoStarted.current || isRunning) return;
    if (!isTourScreen) return;
    const timer = setTimeout(() => {
      hasAutoStarted.current = true;
      startTour("auto");
    }, AUTO_START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [shouldAutoStart, isRunning, isTourScreen, startTour]);

  const value = useMemo(
    () => ({ startTour, isRunning }),
    [startTour, isRunning],
  );

  return (
    <GuidedTourContext.Provider value={value}>
      {children}
    </GuidedTourContext.Provider>
  );
};

type Props = PropsWithChildren<{
  /** Prefixes the analytics events, e.g. `profile` → `profile_tour_started`. */
  name: string;
  steps: TourStep[];
  context: Context<GuidedTourContextValue>;
  /** Namespaced root key holding every step's `title` and `body`. */
  i18nPrefix: string;
  /** Test seam: defaults to the route on display. */
  currentScreen?: string;
  /** Starts on its own on the first visit of one of the tour's screens. */
  shouldAutoStart: boolean;
  /** The tour was walked through or dismissed: no need to show it again. */
  onDone: () => void;
  /** Test seam, forwarded to the tour engine. */
  measure?: (node: MeasurableNode) => Promise<TargetRect | null>;
}>;

/**
 * A feature tour: starts on its own on first visit, can be replayed through
 * its context, reports its progress to analytics.
 */
export const GuidedTourProvider = ({
  name,
  steps,
  context,
  i18nPrefix,
  currentScreen,
  shouldAutoStart,
  onDone,
  measure,
  children,
}: Props) => {
  const triggerRef = useRef<TourTrigger>("auto");

  const screenOnDisplay = useCurrentScreen();
  const activeScreen = currentScreen ?? screenOnDisplay;

  // The tour also runs when analytics are refused: the use case reports
  // nothing then.
  const { captureAnalyticsEvent } = useContext(UsecasesContext);
  const capture = (event: string, properties: AnalyticsProperties) =>
    captureAnalyticsEvent(`${name}_${event}`, properties);

  const handleStart = ({
    stepId,
    screen,
  }: {
    stepId: string;
    screen?: string;
  }) =>
    capture("tour_started", {
      trigger: triggerRef.current,
      entry_step: stepId,
      screen: screen ?? null,
    });

  const handleStepViewed = (info: {
    stepId: string;
    stepIndex: number;
    stepCount: number;
  }) =>
    capture("tour_step_viewed", {
      step_id: info.stepId,
      step_index: info.stepIndex,
      step_count: info.stepCount,
    });

  const handleStepSkipped = (info: { stepId: string; reason: SkipReason }) =>
    capture("tour_step_skipped", {
      step_id: info.stepId,
      reason: info.reason,
    });

  const handleFinish = (info: TourFinishInfo) => {
    if (info.completed)
      capture("tour_completed", {
        steps_viewed: info.stepsViewed,
        step_count: info.stepCount,
      });
    else
      capture("tour_dismissed", {
        step_id: info.stepId ?? null,
        step_index: info.stepIndex,
      });

    onDone();
  };

  return (
    <TourProvider
      steps={steps}
      currentScreen={activeScreen}
      measure={measure}
      onStart={handleStart}
      onStepViewed={handleStepViewed}
      onStepSkipped={handleStepSkipped}
      onFinish={handleFinish}
    >
      <TourController
        context={context}
        steps={steps}
        triggerRef={triggerRef}
        currentScreen={activeScreen}
        shouldAutoStart={shouldAutoStart}
      >
        {children}
      </TourController>
      <GuidedTourOverlay i18nPrefix={i18nPrefix} />
    </TourProvider>
  );
};
