import { useCallback } from "react";

import { useTourRegistry } from "@common/tour/TourContext";

/**
 * Returns a callback to fire when the user performs the action an `action`
 * step asks for. It moves the tour on only while that step is the active one,
 * so it is safe to call on every press.
 */
export const useTourStepAction = (stepId: string) => {
  const { completeStep } = useTourRegistry();

  return useCallback(() => completeStep(stepId), [completeStep, stepId]);
};
