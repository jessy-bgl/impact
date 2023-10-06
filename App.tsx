import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import { Emissions } from "./src/view/screens/emissions/Emissions";
import "./src/view/traductions/i18n";

const Tab = createMaterialBottomTabNavigator();

const AppTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#59B158",
    onPrimary: "#111",
    inversePrimary: "#fff",
  },
};

const iconSize = 26;

const App = () => {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Tab.Navigator
              initialRouteName="Emissions"
              activeColor={AppTheme.colors.primary}
              // TODO: find a way to avoid inactive label color bug when specifying inactiveColor
              // inactiveColor={AppTheme.colors.onSurfaceDisabled}
              theme={{ colors: { secondaryContainer: undefined } }}
            >
              <Tab.Screen
                name="Emissions"
                component={Emissions}
                options={{
                  tabBarIcon: ({ focused, color }) => {
                    return (
                      <Icons
                        name={focused ? "home" : "home-outline"}
                        size={iconSize}
                        color={color}
                      />
                    );
                  },
                }}
              />
              <Tab.Screen
                name="TODO"
                component={Emissions}
                options={{
                  tabBarIcon: ({ color }) => {
                    return <Icons name="tools" size={iconSize} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="TODO2"
                component={Emissions}
                options={{
                  tabBarIcon: ({ color }) => {
                    return <Icons name="tools" size={iconSize} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="TODO3"
                component={Emissions}
                options={{
                  tabBarIcon: ({ color }) => {
                    return <Icons name="tools" size={iconSize} color={color} />;
                  },
                }}
              />
            </Tab.Navigator>
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
