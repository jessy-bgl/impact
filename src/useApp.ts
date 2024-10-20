import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";
import { Profile } from "@domain/entities/profile/Profile";
import { Question } from "@domain/entities/question/Question";

export const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

export const useApp = () => {
  const [isReady, setIsReady] = useState(!__DEV__);

  const [initialState, setInitialState] = useState();

  const { syncStoredProfileWithEngine, syncEngineWithStoredActions } =
    useContext(UsecasesContext);

  const ademeProfile = useAppStore((state) => state.profile.ademe);

  // NB: do not use useMemo here, it causes questions to not be rendered
  // and it does not improve performance
  const questions: Record<keyof Profile, Question> =
    AdemeFootprintEngine.getQuestions(ademeProfile);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (__DEV__ || (Platform.OS !== "web" && initialUrl == null)) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;
          if (state !== undefined) setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      try {
        restoreState();
        syncStoredProfileWithEngine();
        syncEngineWithStoredActions();
      } catch (e) {
        // TODO: envoyer l'erreur à un service de monitoring
        console.error(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return {
    isReady,
    initialState,
    questions,
  };
};
