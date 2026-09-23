import { useEffect } from "react";

import { useTourRegistry } from "@common/tour/TourContext";

/**
 * Declares whether a step can be shown at all. An unavailable step is filtered
 * out of the tour up front — no dead wait on a target that will never mount,
 * and the `n/N` progress stays truthful.
 */
export const useTourStepAvailability = (stepId: string, available: boolean) => {
  const { setStepAvailability } = useTourRegistry();

  useEffect(() => {
    setStepAvailability(stepId, available);

    return () => setStepAvailability(stepId, true);
  }, [stepId, available, setStepAvailability]);
};
