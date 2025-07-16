import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import { UsecasesContext } from "@common/UsecasesContext";

export const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

export const useApp = () => {
  const [isReady, setIsReady] = useState(false);

  const [initialState, setInitialState] = useState();

  const { syncStoredProfileWithEngine } = useContext(UsecasesContext);

  useEffect(() => {
    const restoreNavigationState = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (Platform.OS !== "web" && initialUrl == null) {
        const savedState = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedState ? JSON.parse(savedState) : undefined;
        if (state !== undefined) setInitialState(state);
      }
    };

    try {
      if (!isReady) {
        restoreNavigationState();
        syncStoredProfileWithEngine();
      }
    } catch (e) {
      // TODO: envoyer l'erreur à un service de monitoring
      console.error(e);
    } finally {
      setIsReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return {
    isReady,
    initialState,
  };
};
