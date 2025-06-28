import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import { UsecasesContext } from "@common/UsecasesContext";

export const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

export const useApp = () => {
  const [isReady, setIsReady] = useState(!__DEV__);

  const [initialState, setInitialState] = useState();

  const { syncStoredProfileWithEngine } = useContext(UsecasesContext);

  useEffect(() => {
    const restoreState = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (__DEV__ || (Platform.OS !== "web" && initialUrl == null)) {
        // Only restore state if there's no deep link and we're not on web
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        if (state !== undefined) setInitialState(state);
      }
    };

    if (!isReady) {
      try {
        restoreState();
        syncStoredProfileWithEngine();
      } catch (e) {
        // TODO: envoyer l'erreur à un service de monitoring
        console.error(e);
      } finally {
        setIsReady(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return {
    isReady,
    initialState,
  };
};
