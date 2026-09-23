import { PropsWithChildren } from "react";

import {
  ACTIONS_TOUR_I18N_PREFIX,
  ACTIONS_TOUR_STEP_IDS,
  ACTIONS_TOUR_STEPS,
} from "@carbonFootprint/domain/entities/tour/actionsTour";
import { useIntro } from "@carbonFootprint/domain/hooks/useIntro";
import { useIsProfileCompleted } from "@carbonFootprint/domain/hooks/useIsProfileCompleted";
import { ActionsTourContext } from "@carbonFootprint/view/tour/ActionsTourContext";
import { GuidedTourProvider } from "@common/tour/GuidedTourProvider";
import { MeasurableNode, TargetRect } from "@common/tour/types";
import { useTourStepAvailability } from "@common/tour/useTourStepAvailability";

/** Only a partial profile needs completing for the actions to be relevant. */
const CompleteProfileStepAvailability = () => {
  const isProfileCompleted = useIsProfileCompleted();

  useTourStepAvailability(
    ACTIONS_TOUR_STEP_IDS.completeProfile,
    !isProfileCompleted,
  );

  return null;
};

type Props = PropsWithChildren<{
  /** Test seam: defaults to the route on display. */
  currentScreen?: string;
  /** Test seam, forwarded to the tour engine. */
  measure?: (node: MeasurableNode) => Promise<TargetRect | null>;
}>;

export const ActionsTourProvider = ({
  currentScreen,
  measure,
  children,
}: Props) => {
  const { shouldShowIntro, hideIntro } = useIntro("actions");

  return (
    <GuidedTourProvider
      name="actions"
      steps={ACTIONS_TOUR_STEPS}
      context={ActionsTourContext}
      i18nPrefix={ACTIONS_TOUR_I18N_PREFIX}
      currentScreen={currentScreen}
      shouldAutoStart={shouldShowIntro}
      onDone={hideIntro}
      measure={measure}
    >
      <CompleteProfileStepAvailability />
      {children}
    </GuidedTourProvider>
  );
};
