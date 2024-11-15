import "@expo/metro-runtime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "intl-pluralrules";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppNavigation } from "@common/AppNavigation";
import { QuestionsContext } from "@view/screens/profile/QuestionsContext";
import "../logger.config";
import { AppTheme } from "./AppTheme";
import { PERSISTENCE_KEY, useApp } from "./useApp";
import "./view/translations/i18n";

// NB : plausible removed because of Android build error:
// ReferenceError: Property 'history' doesn't exist, js engine: hermes
// import { plausible } from "./plausible";

const App = () => {
  const { initialState, isReady } = useApp();

  if (!isReady) return <ActivityIndicator />;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <PaperProvider theme={AppTheme}>
        {/* TODO: supprimer ce Provider */}
        <QuestionsContext.Provider value={{}}>
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
            <View style={styles.container}>
              <View style={styles.content}>
                <AppNavigation />
              </View>
            </View>
          </NavigationContainer>
        </QuestionsContext.Provider>
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
