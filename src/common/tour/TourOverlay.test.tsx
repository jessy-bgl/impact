import { render, screen, userEvent } from "@testing-library/react-native";
import { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TourOverlay } from "@common/tour/TourOverlay";
import { TargetRect } from "@common/tour/types";
import intro from "@common/translations/fr/intro.json";

const nav = intro.tour.nav;
const step = intro.profile.tour.categoryCard;

const labels = {
  previous: nav.previous,
  next: nav.next,
  finish: nav.finish,
  close: nav.close,
  actionHint: nav.actionHint,
};

const PROGRESS_LABEL = "Step 2 of 5";

const rect: TargetRect = { x: 20, y: 120, width: 200, height: 80 };

class OverlayRecorder {
  presses: string[] = [];

  onPrevious = () => this.presses.push("previous");
  onNext = () => this.presses.push("next");
  onSkip = () => this.presses.push("skip");
}

let recorder: OverlayRecorder;

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

const renderOverlay = (
  props: Partial<Parameters<typeof TourOverlay>[0]> = {},
) =>
  render(
    <TourOverlay
      visible
      rect={rect}
      title={step.title}
      body={step.body}
      stepIndex={1}
      stepCount={5}
      progressLabel={PROGRESS_LABEL}
      labels={labels}
      showPrevious
      isLastStep={false}
      onPrevious={recorder.onPrevious}
      onNext={recorder.onNext}
      onSkip={recorder.onSkip}
      {...props}
    />,
    { wrapper: Providers },
  );

describe("TourOverlay", () => {
  beforeEach(() => {
    recorder = new OverlayRecorder();
  });

  it("explains the spotlighted element", async () => {
    await renderOverlay();

    expect(screen.getByText(step.title)).toBeOnTheScreen();
    expect(screen.getByText(step.body)).toBeOnTheScreen();
    expect(screen.getByLabelText(PROGRESS_LABEL)).toBeOnTheScreen();
  });

  it("renders nothing when hidden", async () => {
    await renderOverlay({ visible: false });

    expect(screen.queryByText(step.title)).not.toBeOnTheScreen();
  });

  it("moves through the tour from its buttons", async () => {
    await renderOverlay();

    await userEvent.press(screen.getByText(nav.next));
    await userEvent.press(screen.getByText(nav.previous));

    expect(recorder.presses).toEqual(["next", "previous"]);
  });

  it("hides the previous button on the first step", async () => {
    await renderOverlay({ showPrevious: false });

    expect(screen.queryByText(nav.previous)).not.toBeOnTheScreen();
  });

  it("closes the tour from the close icon", async () => {
    await renderOverlay();

    await userEvent.press(screen.getByLabelText(nav.close));

    expect(recorder.presses).toEqual(["skip"]);
  });

  it("labels the last step's button as the end of the tour", async () => {
    await renderOverlay({ isLastStep: true });

    expect(screen.queryByText(nav.next)).not.toBeOnTheScreen();
    expect(screen.getByText(nav.finish)).toBeOnTheScreen();
  });

  it("invites the user to act on the app instead of offering buttons", async () => {
    await renderOverlay({ interactive: true });

    expect(screen.getByText(nav.actionHint)).toBeOnTheScreen();
    expect(screen.queryByText(nav.next)).not.toBeOnTheScreen();
    expect(screen.queryByText(nav.previous)).not.toBeOnTheScreen();
  });

  it("keeps a way out of the tour on steps where the user must act", async () => {
    await renderOverlay({ interactive: true });

    await userEvent.press(screen.getByLabelText(nav.close));

    expect(recorder.presses).toEqual(["skip"]);
  });

  it("holds the card back while the next target is being located", async () => {
    await renderOverlay({ rect: null, pending: true });

    expect(screen.getByText(step.title)).not.toBeVisible();

    await userEvent.press(screen.getByText(nav.next));

    expect(recorder.presses).toEqual([]);
  });

  it("lets taps reach the element the user must act on", async () => {
    await renderOverlay({ interactive: true });

    // The four dimmed rectangles around the hole, none over it.
    expect(screen.getAllByTestId("tour-blocker")).toHaveLength(4);
  });

  it("stops taps through the previous hole while the next target is being located", async () => {
    await renderOverlay({ interactive: true });

    await screen.rerender(
      <TourOverlay
        visible
        pending
        interactive
        rect={null}
        title={step.title}
        body={step.body}
        stepIndex={2}
        stepCount={5}
        progressLabel={PROGRESS_LABEL}
        labels={labels}
        showPrevious
        isLastStep={false}
        onPrevious={recorder.onPrevious}
        onNext={recorder.onNext}
        onSkip={recorder.onSkip}
      />,
    );

    expect(screen.getAllByTestId("tour-blocker")).toHaveLength(5);
  });

  it("still explains the step when there is nothing to spotlight", async () => {
    await renderOverlay({ rect: null });

    expect(screen.getByText(step.body)).toBeOnTheScreen();
  });
});
