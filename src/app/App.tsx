import "@expo/metro-runtime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "intl-pluralrules";
import { PostHogErrorBoundary, PostHogProvider } from "posthog-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppNavigator, AppTabParamList } from "@app/AppNavigator";
import { useAppTheme } from "@app/AppTheme";
import { PERSISTENCE_KEY, useApp } from "@app/useApp";
import { posthog } from "@common/config/posthog";
import "@common/translations/i18n";
import "../../logger.config";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const { initialState, isReady } = useApp();

  const theme = useAppTheme();

  // @react-navigation/native v7 no longer supports PostHog's automatic screen
  // autocapture, so screen views are captured manually from the container.
  const navigationRef = useNavigationContainerRef<AppTabParamList>();
  const routeNameRef = useRef<string | undefined>(undefined);

  const captureScreen = () => {
    const routeName = navigationRef.getCurrentRoute()?.name;
    if (routeName && routeName !== routeNameRef.current)
      posthog.screen(routeName);
    routeNameRef.current = routeName;
  };

  useEffect(() => {
    if (isReady) SplashScreen.hide();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <PaperProvider theme={theme}>
        <KeyboardProvider>
          <NavigationContainer
            ref={navigationRef}
            theme={theme}
            initialState={initialState}
            onReady={captureScreen}
            onStateChange={(state) => {
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
              captureScreen();
            }}
          >
            <PostHogProvider
              client={posthog}
              autocapture={{
                captureScreens: false,
                captureTouches: true,
                propsToCapture: ["testID"],
                maxElementsCaptured: 20,
              }}
            >
              <PostHogErrorBoundary>
                <GestureHandlerRootView style={styles.container}>
                  <View style={styles.content}>
                    <AppNavigator />
                  </View>
                </GestureHandlerRootView>
              </PostHogErrorBoundary>
            </PostHogProvider>
          </NavigationContainer>
        </KeyboardProvider>
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
