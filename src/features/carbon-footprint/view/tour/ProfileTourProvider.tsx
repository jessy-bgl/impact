import { PropsWithChildren } from "react";

import {
  PROFILE_TOUR_I18N_PREFIX,
  PROFILE_TOUR_STEPS,
} from "@carbonFootprint/domain/entities/tour/profileTour";
import { useIntro } from "@carbonFootprint/domain/hooks/useIntro";
import { ProfileTourContext } from "@carbonFootprint/view/tour/ProfileTourContext";
import { GuidedTourProvider } from "@common/tour/GuidedTourProvider";
import { MeasurableNode, TargetRect } from "@common/tour/types";

type Props = PropsWithChildren<{
  /** Test seam: defaults to the route on display. */
  currentScreen?: string;
  /** Test seam, forwarded to the tour engine. */
  measure?: (node: MeasurableNode) => Promise<TargetRect | null>;
}>;

export const ProfileTourProvider = ({
  currentScreen,
  measure,
  children,
}: Props) => {
  const { shouldShowIntro, hideIntro } = useIntro("profile");

  return (
    <GuidedTourProvider
      name="profile"
      steps={PROFILE_TOUR_STEPS}
      context={ProfileTourContext}
      i18nPrefix={PROFILE_TOUR_I18N_PREFIX}
      currentScreen={currentScreen}
      shouldAutoStart={shouldShowIntro}
      onDone={hideIntro}
      measure={measure}
    >
      {children}
    </GuidedTourProvider>
  );
};
