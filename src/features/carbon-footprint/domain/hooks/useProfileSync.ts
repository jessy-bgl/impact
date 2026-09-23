import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import { posthog } from "@common/config/posthog";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useProfileSync = () => {
  const { syncFootprintsProfileWithEngine } = useContext(UsecasesContext);

  const isFocused = useIsFocused();
  const hasInitiallyFocused = useRef(false);

  const [isSyncing, setIsSyncing] = useState(false);

  // Sync profile with engine is required here when returning from other screens
  // because some footprint categories are linked together. For example,
  // updating the housing profile may affect the transport footprint.
  useEffect(() => {
    if (!isFocused) return;

    // Skip sync on initial focus (first time visiting the screen)
    if (!hasInitiallyFocused.current) {
      hasInitiallyFocused.current = true;
      return;
    }

    const syncProfile = async () => {
      setIsSyncing(true);
      try {
        await syncFootprintsProfileWithEngine();
      } catch (error) {
        console.error("Syncing profile error:", error);
        // Never forward the raw error: it can embed the user's footprint
        // answers. See docs/gdpr-compliance.md §3.
        posthog.captureException(new Error("profile_sync_failed"));
      } finally {
        setIsSyncing(false);
      }
    };

    syncProfile();

    return () => setIsSyncing(false);
  }, [isFocused, syncFootprintsProfileWithEngine]);

  const [syncAnimation] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (isSyncing) {
      syncAnimation.setValue(0); // Reset rotation value to 0 before starting
      const rotation = Animated.loop(
        Animated.timing(syncAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      );
      rotation.start();
      return () => rotation.stop();
    }
  }, [isSyncing, syncAnimation]);

  return { isSyncing, syncAnimation };
};
