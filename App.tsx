import "@expo/metro-runtime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import "intl-pluralrules";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

import { AppNavigation } from "@common/AppNavigation";
import { UsecasesContext } from "@common/UsecasesContext";
import { AppTheme } from "./AppTheme";
import "./logger.config";
// NB : plausible removed because of Android build error:
// ReferenceError: Property 'history' doesn't exist, js engine: hermes
// import { plausible } from "./plausible";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import "./src/view/translations/i18n";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

const App = () => {
  const [isReady, setIsReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState();
  const { useUpdateActions } = useContext(UsecasesContext);
  const { updateActions } = useUpdateActions();

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
      restoreState();
      updateActions();
    }
  }, [isReady]);

  if (!isReady) return <ActivityIndicator />;

  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer
        theme={AppTheme}
        initialState={initialState}
        onStateChange={(state) => {
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));

          const route = state?.routes[state.index];
          if (route === undefined) return;

          // NB : plausible removed because of Android build error (cf. top of file)
          // if (route.state && route.state.index !== undefined) {
          //   const subroute = route.state.routes[route.state.index];
          //   plausible.trackEvent("Navigation", {
          //     props: { page: subroute.name },
          //   });
          // } else {
          //   plausible.trackEvent("Navigation", {
          //     props: { page: route.name },
          //   });
          // }
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <AppNavigation />
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 550,
  },
});

serviceWorkerRegistration.register();

export default App;
