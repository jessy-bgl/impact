import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWindowDimensions } from "react-native";

import { isSameRect } from "@common/tour/geometry";
import { measureNode } from "@common/tour/measureNode";
import {
  MAX_MEASURE_ATTEMPTS,
  MAX_MEASURE_ATTEMPTS_OPTIONAL,
  MEASURE_RETRY_DELAY_MS,
  REMEASURE_POLL_MAX_MS,
  REMEASURE_POLL_MS,
  SCROLL_SETTLE_MS,
} from "@common/tour/tourConstants";
import {
  MeasurableNode,
  SkipReason,
  TargetRect,
  TourScrollContainer,
  TourStatus,
  TourStep,
} from "@common/tour/types";

export type TourStartOptions = {
  screen?: string;
};

export type TourFinishInfo = {
  completed: boolean;
  stepId?: string;
  stepIndex: number;
  stepsViewed: number;
  stepCount: number;
};

export type TourContextValue = {
  status: TourStatus;
  step?: TourStep;
  stepIndex: number;
  stepCount: number;
  rect: TargetRect | null;
  /** Label the spotlighted target registered with, for the step's copy. */
  targetLabel?: string;
  isRunning: boolean;
  /**
   * False when the previous step lives on another screen, or asked the user to
   * act on the app: going back there would strand the tour.
   */
  canGoBack: boolean;
  start: (options?: TourStartOptions) => void;
  next: () => void;
  previous: () => void;
  skip: () => void;
};

/**
 * What screens use to declare themselves to the tour. Kept apart from the
 * tour state, which changes on every re-measure: the many anchored components
 * only re-render when the active step changes.
 */
export type TourRegistryValue = {
  /** Active steps of this tour and of every enclosing one. */
  activeStepIds: string[];
  /** Moves past `stepId` if it is the active step, no-op otherwise. */
  completeStep: (stepId: string) => void;
  registerTarget: (
    id: string,
    node: MeasurableNode,
    label?: string,
  ) => () => void;
  registerScrollContainer: (container: TourScrollContainer) => () => void;
  setStepAvailability: (stepId: string, available: boolean) => void;
};

const noop = () => {};

// A no-op default rather than a throwing one: anchored components must stay
// mountable outside a TourProvider (screens, and their existing tests).
const TourContext = createContext<TourContextValue>({
  status: "idle",
  stepIndex: -1,
  stepCount: 0,
  rect: null,
  isRunning: false,
  canGoBack: false,
  start: noop,
  next: noop,
  previous: noop,
  skip: noop,
});

const TourRegistryContext = createContext<TourRegistryValue>({
  activeStepIds: [],
  completeStep: noop,
  registerTarget: () => noop,
  registerScrollContainer: () => noop,
  setStepAvailability: noop,
});

export const useTour = () => useContext(TourContext);

export const useTourRegistry = () => useContext(TourRegistryContext);

type Props = PropsWithChildren<{
  steps: TourStep[];
  /** Current route name; drives which steps may show and when the tour resumes. */
  currentScreen?: string;
  /** Seam for tests: replaced by a stub so no host node is ever measured. */
  measure?: (node: MeasurableNode) => Promise<TargetRect | null>;
  onStart?: (info: { stepId: string; screen?: string }) => void;
  onStepViewed?: (info: {
    stepId: string;
    stepIndex: number;
    stepCount: number;
  }) => void;
  onStepSkipped?: (info: { stepId: string; reason: SkipReason }) => void;
  onFinish?: (info: TourFinishInfo) => void;
}>;

type RegisteredTarget = { node: MeasurableNode; label?: string };

const matchesScreen = (step: TourStep, screen?: string) =>
  !screen || step.screens.includes(screen);

const advanceMode = (step: TourStep) => step.advance ?? "button";

export const TourProvider = ({
  steps,
  currentScreen,
  measure = measureNode,
  onStart,
  onStepViewed,
  onStepSkipped,
  onFinish,
  children,
}: Props) => {
  // Tours nest, one per feature: whatever a screen declares (anchors, scroll
  // containers, availability, actions) also reaches every enclosing tour, not
  // only the nearest one.
  const parent = useTourRegistry();

  const [activeStepId, setActiveStepId] = useState<string>();
  const [measured, setMeasured] = useState<{
    stepId: string;
    rect: TargetRect;
    label?: string;
  } | null>(null);
  // Declared by the screens (`useTourStepAvailability`).
  const [unavailable, setUnavailable] = useState<Record<string, true>>({});
  // Found out by the tour itself: targets that never showed up during this run.
  const [missing, setMissing] = useState<Record<string, true>>({});

  const targets = useRef(new Map<string, RegisteredTarget[]>());
  const scrollContainers = useRef<TourScrollContainer[]>([]);
  const stepsViewed = useRef(0);
  const viewedIds = useRef(new Set<string>());

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // Dropping hidden steps up front keeps the progress indicator truthful.
  const visibleSteps = useMemo(
    () => steps.filter((step) => !unavailable[step.id] && !missing[step.id]),
    [steps, unavailable, missing],
  );

  // A step that just became unavailable hands over to the next visible one,
  // without waiting for a target that will never mount.
  const step = useMemo(() => {
    if (!activeStepId) return undefined;
    const activeIndex = steps.findIndex(
      (candidate) => candidate.id === activeStepId,
    );
    if (activeIndex < 0) return undefined;
    return steps
      .slice(activeIndex)
      .find(
        (candidate) => !unavailable[candidate.id] && !missing[candidate.id],
      );
  }, [activeStepId, steps, unavailable, missing]);

  const stepIndex = step
    ? visibleSteps.findIndex((candidate) => candidate.id === step.id)
    : -1;
  const isOnScreen = step ? matchesScreen(step, currentScreen) : false;

  const previousStep = stepIndex > 0 ? visibleSteps[stepIndex - 1] : undefined;
  const canGoBack =
    previousStep !== undefined &&
    matchesScreen(previousStep, currentScreen) &&
    advanceMode(previousStep) === "button";

  const current =
    measured && step && measured.stepId === step.id ? measured : null;
  const rect = current?.rect ?? null;

  const status: TourStatus = !step
    ? "idle"
    : !isOnScreen
      ? "waiting"
      : !step.target || rect
        ? "visible"
        : "measuring";

  // Follow the user across screens. Forward first: resume on the step of the
  // screen they opened. Otherwise they went back: rewind to the step that
  // invited them to open that screen, so the tour picks up where it left off
  // instead of lingering invisibly. Adjusting state during render is React's
  // own answer to "a prop changed and some state must follow".
  const [lastScreen, setLastScreen] = useState(currentScreen);
  if (currentScreen !== lastScreen) {
    setLastScreen(currentScreen);
    if (step && !matchesScreen(step, currentScreen)) {
      const forwardStep = visibleSteps
        .slice(stepIndex + 1)
        .find((candidate) => matchesScreen(candidate, currentScreen));
      const rewindStep = forwardStep
        ? undefined
        : visibleSteps
            .slice(0, Math.max(stepIndex, 0))
            .reverse()
            .find(
              (candidate) =>
                matchesScreen(candidate, currentScreen) &&
                advanceMode(candidate) === "screenChange",
            );
      // The screen the user opens next may hold the targets the previous one
      // lacked (another category, with default values): look for them again.
      if (rewindStep) setMissing({});
      const resumeStep = forwardStep ?? rewindStep;
      if (resumeStep) setActiveStepId(resumeStep.id);
    }
  }

  const registerParentTarget = parent.registerTarget;
  const registerTarget = useCallback(
    (id: string, node: MeasurableNode, label?: string) => {
      const entry: RegisteredTarget = { node, label };
      const entries = targets.current.get(id) ?? [];
      targets.current.set(id, [...entries, entry]);
      const unregisterFromParent = registerParentTarget(id, node, label);

      return () => {
        const registered = targets.current.get(id) ?? [];
        targets.current.set(
          id,
          registered.filter((registeredEntry) => registeredEntry !== entry),
        );
        unregisterFromParent();
      };
    },
    [registerParentTarget],
  );

  const registerParentScrollContainer = parent.registerScrollContainer;
  const registerScrollContainer = useCallback(
    (container: TourScrollContainer) => {
      scrollContainers.current = [...scrollContainers.current, container];
      const unregisterFromParent = registerParentScrollContainer(container);
      return () => {
        scrollContainers.current = scrollContainers.current.filter(
          (registered) => registered !== container,
        );
        unregisterFromParent();
      };
    },
    [registerParentScrollContainer],
  );

  const setParentStepAvailability = parent.setStepAvailability;
  const setStepAvailability = useCallback(
    (stepId: string, available: boolean) => {
      setParentStepAvailability(stepId, available);
      setUnavailable((current) => {
        if (available === !current[stepId]) return current;
        if (available) {
          const { [stepId]: _removed, ...rest } = current;
          return rest;
        }
        return { ...current, [stepId]: true };
      });
    },
    [setParentStepAvailability],
  );

  const finish = useCallback(
    (completed: boolean) => {
      if (!activeStepId) return;
      setActiveStepId(undefined);
      setMeasured(null);
      onFinish?.({
        completed,
        stepId: step?.id ?? activeStepId,
        stepIndex,
        stepsViewed: stepsViewed.current,
        stepCount: visibleSteps.length,
      });
    },
    [activeStepId, step, stepIndex, visibleSteps.length, onFinish],
  );

  // The steps left all became unavailable or missing, e.g. the user completed
  // their profile as the last step asked: the tour is over.
  const hasRunOutOfSteps = activeStepId !== undefined && !step;
  useEffect(() => {
    // Reports to `onFinish`, which cannot run during render. Happens once per
    // run, so the extra render is harmless.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hasRunOutOfSteps) finish(true);
  }, [hasRunOutOfSteps, finish]);

  const startRun = (options?: TourStartOptions) => {
    const screen = options?.screen ?? currentScreen;
    const candidates = steps.filter((candidate) => !unavailable[candidate.id]);
    const entryStep =
      candidates.find((candidate) => matchesScreen(candidate, screen)) ??
      candidates[0];
    if (!entryStep) return;

    stepsViewed.current = 0;
    viewedIds.current = new Set();
    setMissing({});
    // A rect left by a previous run would skip scrolling the target into view.
    setMeasured(null);
    setActiveStepId(entryStep.id);
    onStart?.({ stepId: entryStep.id, screen });
  };
  const startRunRef = useRef(startRun);
  // Stable, so a route change does not re-render every consumer of `start`
  // (the tab navigator among them).
  const start = useCallback(
    (options?: TourStartOptions) => startRunRef.current(options),
    [],
  );

  const advance = useCallback(
    (offset: 1 | -1) => {
      if (stepIndex < 0) return;
      const nextStep = visibleSteps[stepIndex + offset];
      if (!nextStep) {
        if (offset === 1) finish(true);
        return;
      }
      setActiveStepId(nextStep.id);
    },
    [stepIndex, visibleSteps, finish],
  );

  const next = useCallback(() => advance(1), [advance]);
  const previous = useCallback(() => {
    if (canGoBack) advance(-1);
  }, [canGoBack, advance]);
  const skip = useCallback(() => finish(false), [finish]);
  const nextRef = useRef(next);
  const stepIdRef = useRef(step?.id);
  const onStepSkippedRef = useRef(onStepSkipped);
  useEffect(() => {
    startRunRef.current = startRun;
    nextRef.current = next;
    stepIdRef.current = step?.id;
    onStepSkippedRef.current = onStepSkipped;
  });

  // Stable, so the registry only changes with the active steps.
  const completeParentStep = parent.completeStep;
  const completeStep = useCallback(
    (stepId: string) => {
      completeParentStep(stepId);
      if (stepIdRef.current === stepId) nextRef.current();
    },
    [completeParentStep],
  );

  const targetId = isOnScreen ? step?.target : undefined;
  const stepId = step?.id;
  const isOptionalStep = Boolean(step?.optional);
  const isMeasured = rect !== null;

  // Measure the current step's target, retrying while it mounts and lays out,
  // and scrolling it into view first when the screen allows it.
  useEffect(() => {
    if (!targetId || !stepId || isMeasured) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    let hasTriedScrolling = false;
    const maxAttempts = isOptionalStep
      ? MAX_MEASURE_ATTEMPTS_OPTIONAL
      : MAX_MEASURE_ATTEMPTS;

    const attempt = async () => {
      const entry = targets.current.get(targetId)?.[0];
      const rect = entry ? await measure(entry.node) : null;
      if (cancelled) return;

      if (entry && rect) {
        // Screens stay mounted in their stack or tab: only the one on display
        // may scroll.
        const container = scrollContainers.current.findLast(
          (candidate) => candidate.screen === currentScreen,
        );
        if (!hasTriedScrolling && container) {
          hasTriedScrolling = true;
          const scrolled = await container
            .ensureVisible(entry.node)
            .catch(() => false);
          if (cancelled) return;
          if (scrolled) {
            timer = setTimeout(attempt, SCROLL_SETTLE_MS);
            return;
          }
        }
        setMeasured({ stepId, rect, label: entry.label });
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        onStepSkippedRef.current?.({ stepId, reason: "target_missing" });
        // The tour moves on to the next visible step on its own, or finishes
        // without counting this one when it was the last.
        setMissing((current) => ({ ...current, [stepId]: true }));
        return;
      }
      timer = setTimeout(attempt, MEASURE_RETRY_DELAY_MS);
    };

    attempt();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [
    targetId,
    stepId,
    isOptionalStep,
    isMeasured,
    currentScreen,
    windowWidth,
    windowHeight,
    measure,
  ]);

  // Follow scroll and layout shifts (accordion expansion, keyboard) once shown.
  // Polls fast while the target moves, and slows down once it stays put.
  useEffect(() => {
    if (!targetId || !stepId || !isMeasured) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let delay = REMEASURE_POLL_MS;
    let lastRect: TargetRect | null = null;

    const poll = async () => {
      const entry = targets.current.get(targetId)?.[0];
      const rect = entry ? await measure(entry.node) : null;
      if (cancelled) return;
      if (entry && rect) {
        const hasMoved = !isSameRect(rect, lastRect);
        lastRect = rect;
        if (hasMoved)
          setMeasured((current) =>
            current?.stepId === stepId && isSameRect(current.rect, rect)
              ? current
              : { stepId, rect, label: entry.label },
          );
        delay = hasMoved
          ? REMEASURE_POLL_MS
          : Math.min(delay * 2, REMEASURE_POLL_MAX_MS);
      }
      timer = setTimeout(poll, delay);
    };

    timer = setTimeout(poll, delay);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [targetId, stepId, isMeasured, measure]);

  const stepCount = visibleSteps.length;
  const isVisible = status === "visible";

  useEffect(() => {
    if (!isVisible || !stepId) return;
    if (viewedIds.current.has(stepId)) return;
    viewedIds.current.add(stepId);
    stepsViewed.current += 1;
    onStepViewed?.({ stepId, stepIndex, stepCount });
    // `onStepViewed` and the indices are read as of this render on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, stepId]);

  const targetLabel = current?.label;
  const ownStepId = step?.id;
  const parentActiveStepIds = parent.activeStepIds;
  // Every running tour keeps its own active step: an inner tour left waiting
  // must not hide the step an enclosing tour is showing.
  const activeStepIds = useMemo(
    () =>
      ownStepId ? [ownStepId, ...parentActiveStepIds] : parentActiveStepIds,
    [ownStepId, parentActiveStepIds],
  );

  const value = useMemo<TourContextValue>(
    () => ({
      status,
      step,
      stepIndex,
      stepCount,
      rect,
      targetLabel,
      isRunning: step !== undefined,
      canGoBack,
      start,
      next,
      previous,
      skip,
    }),
    [
      status,
      step,
      stepIndex,
      stepCount,
      rect,
      targetLabel,
      canGoBack,
      start,
      next,
      previous,
      skip,
    ],
  );

  const registry = useMemo<TourRegistryValue>(
    () => ({
      activeStepIds,
      completeStep,
      registerTarget,
      registerScrollContainer,
      setStepAvailability,
    }),
    [
      activeStepIds,
      completeStep,
      registerTarget,
      registerScrollContainer,
      setStepAvailability,
    ],
  );

  return (
    <TourRegistryContext.Provider value={registry}>
      <TourContext.Provider value={value}>{children}</TourContext.Provider>
    </TourRegistryContext.Provider>
  );
};
