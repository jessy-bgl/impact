import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import { posthog } from "@common/config/posthog";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

export const useApp = () => {
  const [isReady, setIsReady] = useState(false);

  const [initialState, setInitialState] = useState();

  const { syncFootprintsProfileWithEngine } = useContext(UsecasesContext);

  useEffect(() => {
    const restoreNavigationState = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (Platform.OS !== "web" && initialUrl == null) {
        const savedState = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedState ? JSON.parse(savedState) : undefined;
        if (state !== undefined) setInitialState(state);
      }
    };

    const initialize = async () => {
      try {
        if (!isReady) {
          restoreNavigationState();
          // Sync profile with engine at startup is important in case
          // the engine has been updated. Not awaited, so the surrounding
          // try/catch never sees its rejection: it is handled here.
          syncFootprintsProfileWithEngine({ handleMigration: true }).catch(
            (error) => {
              console.error("Startup profile sync error:", error);
              // Never forward the raw error: it can embed the user's footprint
              // answers. See docs/gdpr-compliance.md.
              posthog.captureException(
                new Error("startup_profile_sync_failed"),
              );
            },
          );
        }
      } catch (e) {
        console.error(e);
        posthog.captureException(new Error("app_init_failed"));
      } finally {
        setIsReady(true);
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return {
    isReady,
    initialState,
  };
};
