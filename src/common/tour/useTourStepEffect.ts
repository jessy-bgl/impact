import { useEffect, useRef } from "react";

import { useTourRegistry } from "@common/tour/TourContext";

/**
 * Runs `effect` once each time the given step becomes the active one, letting a
 * screen prepare its UI for that step (expanding a section, for instance).
 */
export const useTourStepEffect = (stepId: string, effect: () => void) => {
  const { activeStepIds } = useTourRegistry();
  const isActive = activeStepIds.includes(stepId);

  const effectRef = useRef(effect);

  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    if (!isActive) return;
    effectRef.current();
  }, [isActive]);
};
