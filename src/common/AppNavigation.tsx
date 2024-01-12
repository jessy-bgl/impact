import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Actions } from "@view/screens/actions/Actions";
import { Comparator } from "@view/screens/magnitude/Comparator";
import { Emissions } from "@view/screens/emissions/Emissions";
import { Objectives } from "@view/screens/objectives/Objectives";
import { Profile } from "@view/screens/profile/Profile";
import { FoodProfile } from "@view/screens/profile/food/Food";
import { TransportProfile } from "@view/screens/profile/transport/Transport";
import { HousingProfile } from "@view/screens/profile/housing/Housing";
import { EverydayThingsProfile } from "@view/screens/profile/everyday-things/EverydayThings";

import { AppTheme } from "../../AppTheme";

const Stack = createNativeStackNavigator();
const ProfileTab = createBottomTabNavigator();
const ComparatorDrawer = createDrawerNavigator();

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
  const { t } = useTranslation("pages");

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
        options={{ title: t("Profile") }}
      />
      <Stack.Screen
        name="TransportProfile"
        component={TransportProfile}
        options={{ title: t("Transport") }}
      />
      <Stack.Screen
        name="FoodProfile"
        component={FoodProfile}
        options={{ title: t("Food") }}
      />
      <Stack.Screen
        name="HousingProfile"
        component={HousingProfile}
        options={{ title: t("Housing") }}
      />
      <Stack.Screen
        name="EverydayThingsProfile"
        component={EverydayThingsProfile}
        options={{ title: t("EverydayThings") }}
      />
      {/*<Stack.Screen
        name="PublicServicesProfile"
        component={PublicServicesProfile}
        options={{ title: t("PublicServices") }}
      /> */}
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { t } = useTranslation("pages");

  return (
    <ProfileTab.Navigator
      initialRouteName="Emissions"
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarStyle: { height: 55, paddingBottom: 8 },
        headerShown: false,
      }}
    >
      <ProfileTab.Screen
        name="Emissions"
        component={Emissions}
        options={{
          title: t("Emissions"),
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
      <ProfileTab.Screen
        name="Actions"
        component={Actions}
        options={{
          title: t("Actions"),
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
      <ProfileTab.Screen
        name="Objectives"
        component={Objectives}
        options={{
          title: t("Objectives"),
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
      <ProfileTab.Screen
        name="Magnitude"
        component={ComparatorNavigator}
        options={{
          title: t("Comparator"),
          tabBarIcon: ({ color }) => {
            return (
              <Icons name="compare-horizontal" size={iconSize} color={color} />
            );
          },
        }}
      />
    </ProfileTab.Navigator>
  );
};

const ComparatorNavigator = () => {
  const { t } = useTranslation("pages");

  return (
    <ComparatorDrawer.Navigator
      initialRouteName="Comparator"
      screenOptions={{ headerTintColor: AppTheme.colors.text }}
    >
      <ComparatorDrawer.Screen
        name="Comparator"
        component={Comparator}
        options={{ title: t("Comparator") }}
      />
    </ComparatorDrawer.Navigator>
  );
};
