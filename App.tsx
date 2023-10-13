import {
  NavigationContainer,
  DarkTheme as NavigationTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { registerRootComponent } from "expo";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";

import { AppNavigation } from "./src/common/AppNavigation";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import "./src/view/traductions/i18n";

const MaterialTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#59B158",
    onPrimary: "#111",
    inversePrimary: "#fff",
  },
};

const AppTheme = merge(NavigationTheme, MaterialTheme);

const App = () => {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer theme={AppTheme}>
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

export default registerRootComponent(App);

serviceWorkerRegistration.register();
