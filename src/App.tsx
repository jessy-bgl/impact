import "@expo/metro-runtime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "intl-pluralrules";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppNavigation } from "@common/AppNavigation";
import "../logger.config";
import { AppTheme } from "./AppTheme";
import { PERSISTENCE_KEY, useApp } from "./useApp";
import "./view/translations/i18n";

// NB : plausible removed because of Android build error:
// ReferenceError: Property 'history' doesn't exist, js engine: hermes

SplashScreen.preventAutoHideAsync();

const App = () => {
  const { initialState, isReady } = useApp();

  useEffect(() => {
    if (isReady) SplashScreen.hide();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <PaperProvider theme={AppTheme}>
        <NavigationContainer
          theme={AppTheme}
          initialState={initialState}
          onStateChange={(state) => {
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));

            // const route = state?.routes[state.index];
            // if (route === undefined) return;

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
          <GestureHandlerRootView style={styles.container}>
            <View style={styles.content}>
              <AppNavigation />
            </View>
          </GestureHandlerRootView>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
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
    maxWidth: 1024,
  },
});

export default App;
