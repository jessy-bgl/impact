import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/** Follows the system "reduce motion" setting. */
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (!cancelled) setReducedMotion(enabled);
      })
      .catch(() => {});

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReducedMotion,
    );

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, []);

  return reducedMotion;
};
