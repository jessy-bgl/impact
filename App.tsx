import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { Emissions } from "./src/infra/screens/Emissions";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Emissions" component={Emissions} />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
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
