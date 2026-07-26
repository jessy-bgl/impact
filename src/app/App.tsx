import "@expo/metro-runtime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "intl-pluralrules";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppNavigator } from "@app/AppNavigator";
import { useAppTheme } from "@app/AppTheme";
import { PERSISTENCE_KEY, useApp } from "@app/useApp";
import "@common/translations/i18n";
import "../../logger.config";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const { initialState, isReady } = useApp();

  const theme = useAppTheme();

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
            theme={theme}
            initialState={initialState}
            onStateChange={(state) => {
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
            }}
          >
            <GestureHandlerRootView style={styles.container}>
              <View style={styles.content}>
                <AppNavigator />
              </View>
            </GestureHandlerRootView>
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
