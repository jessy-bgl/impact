import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { ReactNode, useEffect } from "react";
import { Pressable, Text } from "react-native";

import {
  TourFinishInfo,
  TourProvider,
  useTour,
  useTourRegistry,
} from "@common/tour/TourContext";
import {
  MAX_MEASURE_ATTEMPTS,
  MAX_MEASURE_ATTEMPTS_OPTIONAL,
  REMEASURE_POLL_MS,
  SCROLL_SETTLE_MS,
} from "@common/tour/tourConstants";
import {
  MeasurableNode,
  SkipReason,
  TargetRect,
  TourScrollContainer,
  TourStep,
} from "@common/tour/types";
import { useTourStepAvailability } from "@common/tour/useTourStepAvailability";
import { useTourStepEffect } from "@common/tour/useTourStepEffect";
import { useTourTarget } from "@common/tour/useTourTarget";

const HUB = "Hub";
const DETAIL = "Detail";

const MEASURED_RECT: TargetRect = { x: 10, y: 20, width: 100, height: 40 };
/** Where a scroll container announces the target will rest. */
const PREDICTED_RECT: TargetRect = { ...MEASURED_RECT, y: 300 };

const steps: TourStep[] = [
  { id: "intro", screens: [HUB], i18nKey: "intro" },
  {
    id: "card",
    screens: [HUB],
    target: "cardTarget",
    i18nKey: "card",
    advance: "screenChange",
  },
  {
    id: "detail",
    screens: [DETAIL],
    target: "detailTarget",
    i18nKey: "detail",
  },
  { id: "outro", screens: [DETAIL], i18nKey: "outro" },
];

const actionSteps: TourStep[] = [
  {
    id: "act",
    screens: [HUB],
    target: "actTarget",
    i18nKey: "act",
    advance: "action",
  },
  { id: "after", screens: [HUB], i18nKey: "after" },
];

const TARGET_LABEL = "Voiture";

type StubNode = MeasurableNode & { targetId: string };

/** Stands in for `measureInWindow`, which no host node implements under Jest. */
class StubMeasurer {
  calls: string[] = [];
  measurable = new Set<string>();

  measure = async (node: MeasurableNode) => {
    const { targetId } = node as StubNode;
    this.calls.push(targetId);
    return this.measurable.has(targetId) ? MEASURED_RECT : null;
  };
}

class TourRecorder {
  started: string[] = [];
  viewed: string[] = [];
  skipped: { stepId: string; reason: SkipReason }[] = [];
  finished: TourFinishInfo[] = [];

  onStart = ({ stepId }: { stepId: string }) => this.started.push(stepId);
  onStepViewed = ({ stepId }: { stepId: string }) => this.viewed.push(stepId);
  onStepSkipped = (info: { stepId: string; reason: SkipReason }) =>
    this.skipped.push(info);
  onFinish = (info: TourFinishInfo) => this.finished.push(info);
}

/** Scrolls on its first `scrollsNeeded` calls, as an off-screen target would. */
class StubScrollContainer implements TourScrollContainer {
  calls = 0;

  constructor(
    private scrollsNeeded: number,
    public screen = HUB,
  ) {}

  ensureVisible = async () => {
    this.calls += 1;
    return this.calls <= this.scrollsNeeded ? PREDICTED_RECT : null;
  };
}

const StubTarget = ({
  targetId,
  label,
}: {
  targetId: string;
  label?: string;
}) => {
  const { registerTarget } = useTourRegistry();

  useEffect(
    () => registerTarget(targetId, { targetId } as StubNode, label),
    [targetId, label, registerTarget],
  );

  return null;
};

/**
 * Attaches `node` the way react-native-web does: it drops the cleanup a ref
 * callback returns, and calls the callback with null on detach instead.
 */
const WebStyleTarget = ({
  targetId,
  node,
}: {
  targetId: string;
  node: StubNode;
}) => {
  const ref = useTourTarget(targetId);

  useEffect(() => {
    ref(node);
    return () => {
      ref(null);
    };
  }, [ref, node]);

  return null;
};

const StubScrollView = ({ container }: { container: TourScrollContainer }) => {
  const { registerScrollContainer } = useTourRegistry();

  useEffect(
    () => registerScrollContainer(container),
    [container, registerScrollContainer],
  );

  return null;
};

const UnavailableStep = ({ stepId }: { stepId: string }) => {
  useTourStepAvailability(stepId, false);
  return null;
};

const StartButton = ({ testID }: { testID: string }) => {
  const { start } = useTour();

  return (
    <Pressable testID={testID} onPress={() => start()}>
      <Text>{testID}</Text>
    </Pressable>
  );
};

const TourState = () => {
  const {
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
  } = useTour();
  const { completeStep } = useTourRegistry();

  return (
    <>
      <Text testID="status">{status}</Text>
      <Text testID="stepId">{step?.id ?? "none"}</Text>
      <Text testID="progress">{`${stepIndex}/${stepCount}`}</Text>
      <Text testID="canGoBack">{String(canGoBack)}</Text>
      <Text testID="rect">{rect ? `${rect.x},${rect.y}` : "none"}</Text>
      <Text testID="label">{targetLabel ?? "none"}</Text>
      <Pressable testID="start" onPress={() => start()}>
        <Text>start</Text>
      </Pressable>
      <Pressable testID="next" onPress={next}>
        <Text>next</Text>
      </Pressable>
      <Pressable testID="previous" onPress={previous}>
        <Text>previous</Text>
      </Pressable>
      <Pressable testID="skip" onPress={skip}>
        <Text>skip</Text>
      </Pressable>
      <Pressable testID="completeAct" onPress={() => completeStep("act")}>
        <Text>completeAct</Text>
      </Pressable>
    </>
  );
};

const statusText = () => screen.getByTestId("status").props.children;
const stepIdText = () => screen.getByTestId("stepId").props.children;
const canGoBackText = () => screen.getByTestId("canGoBack").props.children;
const progressText = () => screen.getByTestId("progress").props.children;
const rectText = () => screen.getByTestId("rect").props.children;

const press = (testID: string) => userEvent.press(screen.getByTestId(testID));

let measurer: StubMeasurer;
let recorder: TourRecorder;

const renderTour = async ({
  currentScreen = HUB,
  children,
  tourSteps = steps,
}: {
  currentScreen?: string;
  children?: ReactNode;
  tourSteps?: TourStep[];
} = {}) => {
  const tree = (screenName: string, content?: ReactNode) => (
    <TourProvider
      steps={tourSteps}
      currentScreen={screenName}
      measure={measurer.measure}
      onStart={recorder.onStart}
      onStepViewed={recorder.onStepViewed}
      onStepSkipped={recorder.onStepSkipped}
      onFinish={recorder.onFinish}
    >
      {content}
      <TourState />
    </TourProvider>
  );

  const utils = await render(tree(currentScreen, children));

  return {
    ...utils,
    update: (screenName: string, content?: ReactNode) =>
      utils.rerender(tree(screenName, content)),
  };
};

describe("TourProvider", () => {
  beforeEach(() => {
    measurer = new StubMeasurer();
    recorder = new TourRecorder();
  });

  it("stays idle until the tour is started", async () => {
    await renderTour();

    expect(statusText()).toBe("idle");
    expect(stepIdText()).toBe("none");
    expect(recorder.viewed).toEqual([]);
  });

  it("shows a step without target as soon as it starts", async () => {
    await renderTour();

    await press("start");

    expect(statusText()).toBe("visible");
    expect(stepIdText()).toBe("intro");
    expect(recorder.started).toEqual(["intro"]);
    expect(recorder.viewed).toEqual(["intro"]);
  });

  it("waits for a target to register before showing its step", async () => {
    const { update } = await renderTour();

    await press("start");
    await press("next");

    expect(stepIdText()).toBe("card");
    expect(statusText()).toBe("measuring");

    measurer.measurable.add("cardTarget");
    await update(
      HUB,
      <StubTarget targetId="cardTarget" label={TARGET_LABEL} />,
    );

    await waitFor(() => expect(statusText()).toBe("visible"));
    expect(screen.getByTestId("rect").props.children).toBe(
      `${MEASURED_RECT.x},${MEASURED_RECT.y}`,
    );
    expect(screen.getByTestId("label").props.children).toBe(TARGET_LABEL);
  });

  it("waits for the step's screen before looking for its target", async () => {
    await renderTour({ currentScreen: DETAIL });

    await press("start");

    expect(stepIdText()).toBe("detail");
    expect(statusText()).toBe("measuring");
  });

  it("spotlights where the scroll brings the target, without waiting for it to settle", async () => {
    measurer.measurable.add("cardTarget");
    const scrollContainer = new StubScrollContainer(1);
    await renderTour({
      children: (
        <>
          <StubScrollView container={scrollContainer} />
          <StubTarget targetId="cardTarget" />
        </>
      ),
    });

    await press("start");
    await press("next");

    await waitFor(() => expect(statusText()).toBe("visible"));
    expect(scrollContainer.calls).toBe(1);
    expect(rectText()).toBe(`${PREDICTED_RECT.x},${PREDICTED_RECT.y}`);
  });

  it("re-measures the target only once the scroll has settled", async () => {
    measurer.measurable.add("cardTarget");
    const scrollContainer = new StubScrollContainer(1);
    await renderTour({
      children: (
        <>
          <StubScrollView container={scrollContainer} />
          <StubTarget targetId="cardTarget" />
        </>
      ),
    });

    await press("start");
    await press("next");
    await waitFor(() => expect(statusText()).toBe("visible"));

    // Past a regular poll, but before the scroll settles.
    await act(
      () =>
        new Promise((resolve) =>
          setTimeout(resolve, (REMEASURE_POLL_MS + SCROLL_SETTLE_MS) / 2),
        ),
    );
    expect(rectText()).toBe(`${PREDICTED_RECT.x},${PREDICTED_RECT.y}`);

    await waitFor(() =>
      expect(rectText()).toBe(`${MEASURED_RECT.x},${MEASURED_RECT.y}`),
    );
  });

  it("leaves alone the scroll container of a screen not on display", async () => {
    measurer.measurable.add("cardTarget");
    const scrollContainer = new StubScrollContainer(1, DETAIL);
    await renderTour({
      children: (
        <>
          <StubScrollView container={scrollContainer} />
          <StubTarget targetId="cardTarget" />
        </>
      ),
    });

    await press("start");
    await press("next");

    await waitFor(() => expect(statusText()).toBe("visible"));
    expect(scrollContainer.calls).toBe(0);
  });

  it("scrolls the target into view again when the tour restarts", async () => {
    measurer.measurable.add("cardTarget");
    const scrollContainer = new StubScrollContainer(0);
    await renderTour({
      children: (
        <>
          <StubScrollView container={scrollContainer} />
          <StubTarget targetId="cardTarget" />
        </>
      ),
    });

    await press("start");
    await press("next");
    await waitFor(() => expect(statusText()).toBe("visible"));
    await press("skip");
    await press("start");
    await press("next");

    await waitFor(() => expect(statusText()).toBe("visible"));
    expect(scrollContainer.calls).toBe(2);
  });

  it("forgets a target detached with a null ref, as react-native-web does", async () => {
    measurer.measurable.add("mounted");
    const detachedNode = { targetId: "detached" } as StubNode;
    const mountedNode = { targetId: "mounted" } as StubNode;
    const { update } = await renderTour({
      children: <WebStyleTarget targetId="cardTarget" node={detachedNode} />,
    });
    await update(HUB);
    await update(
      HUB,
      <WebStyleTarget targetId="cardTarget" node={mountedNode} />,
    );

    await press("start");
    await press("next");

    await waitFor(() => expect(statusText()).toBe("visible"));
    expect(measurer.calls).not.toContain("detached");
  });

  it("skips a step whose target never shows up", async () => {
    await renderTour({ children: <StubTarget targetId="cardTarget" /> });

    await press("start");
    await press("next");

    await waitFor(
      () =>
        expect(recorder.skipped).toEqual([
          { stepId: "card", reason: "target_missing" },
        ]),
      { timeout: 5000 },
    );
    expect(measurer.calls.length).toBeGreaterThanOrEqual(MAX_MEASURE_ATTEMPTS);
    expect(MAX_MEASURE_ATTEMPTS_OPTIONAL).toBeLessThan(MAX_MEASURE_ATTEMPTS);
    // The skipped step leaves no gap in the progress indicator.
    expect(stepIdText()).toBe("detail");
    expect(progressText()).toBe(`1/${steps.length - 1}`);
  });

  it("resumes on the step matching the screen the user navigated to", async () => {
    measurer.measurable.add("detailTarget");
    const { update } = await renderTour();

    await press("start");
    expect(stepIdText()).toBe("intro");

    await update(DETAIL, <StubTarget targetId="detailTarget" />);

    await waitFor(() => expect(stepIdText()).toBe("detail"));
    expect(statusText()).toBe("visible");
  });

  it("rewinds to the step that led to a screen when the user leaves it", async () => {
    measurer.measurable.add("detailTarget");
    const { update } = await renderTour();

    await press("start");
    await update(DETAIL, <StubTarget targetId="detailTarget" />);
    await waitFor(() => expect(stepIdText()).toBe("detail"));

    await update(HUB, <StubTarget targetId="detailTarget" />);

    expect(stepIdText()).toBe("card");
  });

  it("looks again for a missing target once the user opens another screen", async () => {
    const optionalSteps: TourStep[] = [
      {
        id: "card",
        screens: [HUB],
        i18nKey: "card",
        advance: "screenChange",
      },
      {
        id: "tip",
        screens: [DETAIL],
        target: "tipTarget",
        i18nKey: "tip",
        optional: true,
      },
      { id: "outro", screens: [DETAIL], i18nKey: "outro" },
    ];
    const { update } = await renderTour({ tourSteps: optionalSteps });

    await press("start");
    await update(DETAIL);
    await waitFor(() => expect(stepIdText()).toBe("outro"), { timeout: 5000 });

    await update(HUB);
    expect(stepIdText()).toBe("card");

    measurer.measurable.add("tipTarget");
    await update(DETAIL, <StubTarget targetId="tipTarget" />);

    await waitFor(() => expect(statusText()).toBe("visible"));
    expect(stepIdText()).toBe("tip");
    expect(progressText()).toBe(`1/${optionalSteps.length}`);
  });

  it("waits on a screen no step of the tour belongs to", async () => {
    const { update } = await renderTour();

    await press("start");
    await press("next");
    await update("Elsewhere");

    expect(stepIdText()).toBe("card");
    expect(statusText()).toBe("waiting");
  });

  it("goes back to the previous step and stops at the first one", async () => {
    await renderTour();

    await press("start");
    await press("previous");

    expect(stepIdText()).toBe("intro");
    expect(progressText()).toBe(`0/${steps.length}`);
  });

  it("allows going back to a step on the same screen", async () => {
    await renderTour();

    await press("start");
    expect(canGoBackText()).toBe("false");

    await press("next");

    expect(canGoBackText()).toBe("true");
  });

  it("does not go back to a step on another screen", async () => {
    measurer.measurable.add("detailTarget");
    await renderTour({
      currentScreen: DETAIL,
      children: <StubTarget targetId="detailTarget" />,
    });

    await press("start");
    await waitFor(() => expect(statusText()).toBe("visible"));
    expect(stepIdText()).toBe("detail");
    expect(canGoBackText()).toBe("false");

    await press("previous");

    expect(stepIdText()).toBe("detail");
    expect(statusText()).toBe("visible");
  });

  it("finishes once past the last step", async () => {
    measurer.measurable.add("detailTarget");
    const { update } = await renderTour();

    await press("start");
    await update(DETAIL, <StubTarget targetId="detailTarget" />);
    await waitFor(() => expect(stepIdText()).toBe("detail"));

    await press("next");
    expect(stepIdText()).toBe("outro");

    await press("next");

    expect(statusText()).toBe("idle");
    expect(recorder.finished).toHaveLength(1);
    expect(recorder.finished[0].completed).toBe(true);
  });

  it("finishes once the steps left become unavailable while it waits", async () => {
    const lastSteps: TourStep[] = [
      { id: "intro", screens: [HUB], i18nKey: "intro" },
      { id: "last", screens: [HUB], i18nKey: "last" },
    ];
    const { update } = await renderTour({ tourSteps: lastSteps });

    await press("start");
    await press("next");
    await update(DETAIL);
    expect(statusText()).toBe("waiting");

    await update(DETAIL, <UnavailableStep stepId="last" />);

    await waitFor(() => expect(recorder.finished).toHaveLength(1));
    expect(recorder.finished[0].completed).toBe(true);
    expect(statusText()).toBe("idle");
  });

  it("leaves a missing last step out of the finished run", async () => {
    const lastSteps: TourStep[] = [
      { id: "intro", screens: [HUB], i18nKey: "intro" },
      {
        id: "last",
        screens: [HUB],
        target: "lastTarget",
        i18nKey: "last",
        optional: true,
      },
    ];
    await renderTour({ tourSteps: lastSteps });

    await press("start");
    await press("next");

    await waitFor(() => expect(recorder.finished).toHaveLength(1), {
      timeout: 5000,
    });
    expect(recorder.finished[0]).toMatchObject({
      completed: true,
      stepsViewed: 1,
      stepCount: 1,
    });
  });

  it("keeps the same start function across screen changes", async () => {
    const starts = new Set<unknown>();
    const StartProbe = () => {
      starts.add(useTour().start);
      return null;
    };
    const { update } = await renderTour({ children: <StartProbe /> });

    await update(DETAIL, <StartProbe />);
    await update(HUB, <StartProbe />);

    expect(starts.size).toBe(1);
  });

  it("finishes as incomplete when skipped", async () => {
    await renderTour();

    await press("start");
    await press("skip");

    expect(recorder.finished).toHaveLength(1);
    expect(recorder.finished[0].completed).toBe(false);
    expect(recorder.finished[0].stepId).toBe("intro");
  });

  it("moves on once the user performs the step's action", async () => {
    measurer.measurable.add("actTarget");
    await renderTour({
      tourSteps: actionSteps,
      children: <StubTarget targetId="actTarget" />,
    });

    await press("start");
    await waitFor(() => expect(statusText()).toBe("visible"));

    await press("completeAct");

    expect(stepIdText()).toBe("after");
    expect(canGoBackText()).toBe("false");
  });

  it("ignores an action performed outside of its step", async () => {
    await renderTour();

    await press("start");
    await press("completeAct");

    expect(stepIdText()).toBe("intro");
  });

  it("drops an unavailable step from the tour", async () => {
    await renderTour({ children: <UnavailableStep stepId="card" /> });

    await press("start");

    expect(progressText()).toBe(`0/${steps.length - 1}`);

    await press("next");

    expect(stepIdText()).toBe("detail");
  });

  it("sees the targets declared inside a nested tour", async () => {
    measurer.measurable.add("detailTarget");
    const outerSteps: TourStep[] = [
      { id: "outer", screens: [HUB], target: "detailTarget", i18nKey: "o" },
    ];
    const innerSteps: TourStep[] = [
      { id: "inner", screens: [HUB], i18nKey: "i" },
    ];

    await render(
      <TourProvider
        steps={outerSteps}
        currentScreen={HUB}
        measure={measurer.measure}
      >
        <TourState />
        <TourProvider
          steps={innerSteps}
          currentScreen={HUB}
          measure={measurer.measure}
        >
          <StubTarget targetId="detailTarget" />
        </TourProvider>
      </TourProvider>,
    );

    await press("start");

    await waitFor(() => expect(statusText()).toBe("visible"));
    expect(stepIdText()).toBe("outer");
  });

  it("runs the effect of an enclosing tour's step while a nested tour waits", async () => {
    const outerSteps: TourStep[] = [
      { id: "outer", screens: [HUB], i18nKey: "o" },
    ];
    const innerSteps: TourStep[] = [
      { id: "inner", screens: [DETAIL], i18nKey: "i" },
    ];
    const effectRuns: string[] = [];
    const StepEffect = () => {
      useTourStepEffect("outer", () => effectRuns.push("outer"));
      return null;
    };

    await render(
      <TourProvider steps={outerSteps} currentScreen={HUB}>
        <StartButton testID="startOuter" />
        <TourProvider steps={innerSteps} currentScreen={HUB}>
          <StartButton testID="startInner" />
          <StepEffect />
        </TourProvider>
      </TourProvider>,
    );

    await press("startInner");
    await press("startOuter");

    expect(effectRuns).toEqual(["outer"]);
  });
});
