import { useTranslation } from "react-i18next";

import { useTour } from "@common/tour/TourContext";
import { TourOverlay } from "@common/tour/TourOverlay";

/** Navigation labels shared by every tour, in the `intro` namespace. */
const NAV_KEY = "intro:tour.nav";

type Props = {
  /** Namespaced root key holding every step's `title` and `body`. */
  i18nPrefix: string;
};

export const GuidedTourOverlay = ({ i18nPrefix }: Props) => {
  const { t } = useTranslation();

  const {
    status,
    step,
    stepIndex,
    stepCount,
    rect,
    targetLabel,
    canGoBack,
    next,
    previous,
    skip,
  } = useTour();

  if (!step) return null;

  const stepKey = `${i18nPrefix}.${step.i18nKey}`;
  const copyValues = { label: targetLabel ?? "" };

  return (
    <TourOverlay
      visible={status === "visible" || status === "measuring"}
      pending={status === "measuring"}
      rect={rect}
      // The user advances by acting on the app itself, not from the tooltip.
      interactive={step.advance === "screenChange" || step.advance === "action"}
      padding={step.padding}
      radius={step.radius}
      placement={step.placement}
      title={t(`${stepKey}.title`, copyValues)}
      body={t(`${stepKey}.body`, copyValues)}
      stepIndex={stepIndex}
      stepCount={stepCount}
      progressLabel={t(`${NAV_KEY}.progress`, {
        current: stepIndex + 1,
        total: stepCount,
      })}
      labels={{
        previous: t(`${NAV_KEY}.previous`),
        next: t(`${NAV_KEY}.next`),
        finish: t(`${NAV_KEY}.finish`),
        close: t(`${NAV_KEY}.close`),
        actionHint: t(`${NAV_KEY}.actionHint`),
      }}
      showPrevious={canGoBack}
      isLastStep={stepIndex === stepCount - 1}
      onPrevious={previous}
      onNext={next}
      onSkip={skip}
    />
  );
};
