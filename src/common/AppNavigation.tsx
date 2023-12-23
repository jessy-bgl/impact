import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { Actions } from "@view/screens/actions/Actions";
import { Comparator } from "@view/screens/comparator/Comparator";
import { Emissions } from "@view/screens/emissions/Emissions";
import { Objectives } from "@view/screens/objectives/Objectives";
import { Profile } from "@view/screens/profile/Profile";
import { FoodProfile } from "@view/screens/profile/food/Food";
import { TransportProfile } from "@view/screens/profile/transport/Transport";
import { HousingProfile } from "@view/screens/profile/housing/Housing";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  TransportProfile: undefined;
  FoodProfile: undefined;
  HousingProfile: undefined;
  EverydayThingsProfile: undefined;
  PublicServicesProfile: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const iconSize = 24;

export const AppNavigation = () => {
  const { t } = useTranslation("common");

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: t("screens.Profile") }}
      />
      <Stack.Screen
        name="TransportProfile"
        component={TransportProfile}
        options={{ title: t("screens.Transport") }}
      />
      <Stack.Screen
        name="FoodProfile"
        component={FoodProfile}
        options={{ title: t("screens.Food") }}
      />
      <Stack.Screen
        name="HousingProfile"
        component={HousingProfile}
        options={{ title: t("screens.Housing") }}
      />
      {/* <Stack.Screen
        name="EverydayThingsProfile"
        component={EverydayThingsProfile}
        options={{ title: t("screens.EveydayThings") }}
      />
      <Stack.Screen
        name="PublicServicesProfile"
        component={PublicServicesProfile}
        options={{ title: t("screens.PublicServices") }}
      /> */}
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { t } = useTranslation("common");

  return (
    <Tab.Navigator
      initialRouteName="Emissions"
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarStyle: { height: 50, paddingBottom: 5 },
        headerShown: false,
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
        name="Actions"
        component={Actions}
        options={{
          title: t("screens.Actions"),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icons
                name={focused ? "check-circle" : "check-circle-outline"}
                size={iconSize}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Objectifs"
        component={Objectives}
        options={{
          title: t("screens.Objectives"),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icons
                name={focused ? "medal" : "medal-outline"}
                size={iconSize}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Comparateur"
        component={Comparator}
        options={{
          title: t("screens.Comparator"),
          tabBarIcon: ({ color }) => {
            return (
              <Icons name="compare-horizontal" size={iconSize} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
