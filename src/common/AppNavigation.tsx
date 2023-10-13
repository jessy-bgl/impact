import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { Emissions } from "../view/screens/emissions/Emissions";
// import { Profile } from "../view/screens/profile/Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const iconSize = 24;

export const AppNavigation = () => {
  // const { t } = useTranslation("navigation");

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: t("screens.Profile") }}
      /> */}
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { t } = useTranslation("navigation");

  return (
    <Tab.Navigator
      initialRouteName="Emissions"
      screenOptions={{
        // headerShown: false,
        tabBarStyle: { height: 50, paddingBottom: 5 },
      }}
    >
      <Tab.Screen
        name="Emissions"
        component={Emissions}
        options={{
          title: t("screens.Emissions"),
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
          title: t("screens.Emissions"),
          tabBarIcon: ({ color }) => {
            return <Icons name="tools" size={iconSize} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="TODO2"
        component={Emissions}
        options={{
          title: t("screens.Emissions"),
          tabBarIcon: ({ color }) => {
            return <Icons name="tools" size={iconSize} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="TODO3"
        component={Emissions}
        options={{
          title: t("screens.Emissions"),
          tabBarIcon: ({ color }) => {
            return <Icons name="tools" size={iconSize} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
