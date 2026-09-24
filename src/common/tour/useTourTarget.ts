import { useCallback, useRef } from "react";

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

  // react-native-web merges refs and drops the cleanup a ref callback returns:
  // it calls the callback with null on detach instead. Without this, a node
  // unmounted on web (a collapsed section) would stay registered, and be the
  // one the tour tries, and fails, to measure.
  const unregisterRef = useRef<(() => void) | undefined>(undefined);

  return useCallback(
    (node: MeasurableNode | null) => {
      unregisterRef.current?.();
      unregisterRef.current = undefined;
      if (!enabled || !node) return;

      const unregister = registerTarget(id, node, label);
      unregisterRef.current = unregister;
      return () => {
        if (unregisterRef.current !== unregister) return;
        unregisterRef.current = undefined;
        unregister();
      };
    },
    [id, enabled, label, registerTarget],
  );
};
