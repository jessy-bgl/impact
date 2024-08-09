import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";
import { Profile } from "@domain/entities/profile/Profile";
import { Question } from "@domain/entities/Question";

export const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

export const useApp = () => {
  const [isReady, setIsReady] = useState(!__DEV__);

  const [initialState, setInitialState] = useState();

  const { updateActions, fetchProfile } = useContext(UsecasesContext);

  const profile = useAppStore((state) => state.profile);

  const questions: Record<keyof Profile, Question> =
    AdemeFootprintEngine.getQuestions(profile);

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
      // TODO: déplacer dans un hook / usecase ?
      try {
        restoreState();
        updateActions();
        const profile = fetchProfile();
        AdemeFootprintEngine.updateSituation(profile);
      } catch (e) {
        // TODO: envoyer l'erreur à un service de monitoring
        console.error(e);
      }
    }
  }, [isReady]);

  return {
    isReady,
    initialState,
    questions,
  };
};
