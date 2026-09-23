import { useCallback } from "react";

import { useTourRegistry } from "@common/tour/TourContext";
import { MeasurableNode } from "@common/tour/types";

type Options = {
  /** False registers nothing, the step then treats the target as missing. */
  enabled?: boolean;
  /** Human-readable name, interpolated as `{{label}}` in the step's copy. */
  label?: string;
};

/**
 * Returns a ref callback registering the node as the tour target `id`.
 * Several nodes may share an id (a card rendered five times); the first one
 * mounted is the one spotlighted.
 *
 * The host view MUST set `collapsable={false}`, otherwise Android view
 * flattening removes it and the measurement lands on the wrong element.
 */
export const useTourTarget = (
  id: string,
  { enabled = true, label }: Options = {},
) => {
  const { registerTarget } = useTourRegistry();

  return useCallback(
    (node: MeasurableNode | null) => {
      if (!enabled || !node) return;
      return registerTarget(id, node, label);
    },
    [id, enabled, label, registerTarget],
  );
};
