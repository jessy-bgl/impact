import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

import { Actions } from "@view/screens/actions/Actions";
import {
  AdemeComparatorType,
  Comparator,
} from "@view/screens/comparator/Comparator";
import { Emissions } from "@view/screens/emissions/Emissions";
import { Objectives } from "@view/screens/objectives/Objectives";
import { Profile } from "@view/screens/profile/Profile";
import { EverydayThingsProfile } from "@view/screens/profile/everyday-things/EverydayThings";
import { FoodProfile } from "@view/screens/profile/food/Food";
import { HousingProfile } from "@view/screens/profile/housing/Housing";
import { PublicServicesProfile } from "@view/screens/profile/public-services/PublicServices";
import { TransportProfile } from "@view/screens/profile/transport/Transport";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
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
        component={BottomTabNavigator}
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
      <Stack.Screen
        name="PublicServicesProfile"
        component={PublicServicesProfile}
        options={{ title: t("PublicServices") }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const { t } = useTranslation("pages");

  return (
    <BottomTab.Navigator
      initialRouteName="Emissions"
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarStyle: { height: 55, paddingBottom: 8 },
      }}
    >
      <BottomTab.Screen
        name="Emissions"
        component={Emissions}
        options={{
          headerShown: false,
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
      <BottomTab.Screen
        name="Actions"
        component={Actions}
        options={{
          title: t("Actions"),
          unmountOnBlur: true, // NB: mandatory to refresh the actions list
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
      <BottomTab.Screen
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
      <BottomTab.Screen
        name="Comparator"
        component={ComparatorNavigator}
        options={{
          headerShown: false,
          title: t("Comparator"),
          tabBarIcon: ({ color }) => {
            return (
              <Icons name="compare-horizontal" size={iconSize} color={color} />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

type ComparatorParams = {
  type: AdemeComparatorType;
};

const ComparatorNavigator = () => {
  const { t } = useTranslation("pages");
  const appTheme = useTheme();

  return (
    <ComparatorDrawer.Navigator
      initialRouteName="Comparator"
      screenOptions={{
        headerTintColor: appTheme.colors.onPrimaryContainer,
        unmountOnBlur: true, // NB : this is a workaround to avoid scroll issues
      }}
    >
      <ComparatorDrawer.Screen
        name="Converter"
        component={Comparator}
        initialParams={{ type: "convertisseur" } as ComparatorParams}
        options={{ title: t("Comparator") }}
      />
      <ComparatorDrawer.Screen
        name="DigitalComparator"
        component={Comparator}
        initialParams={{ type: "numerique" } as ComparatorParams}
        options={{ title: t("DigitalComparator") }}
      />
      <ComparatorDrawer.Screen
        name="DigitalUsageComparator"
        component={Comparator}
        initialParams={{ type: "usagenumerique" } as ComparatorParams}
        options={{ title: t("DigitalUsageComparator") }}
      />
      <ComparatorDrawer.Screen
        name="HeatComparator"
        component={Comparator}
        initialParams={{ type: "chauffage" } as ComparatorParams}
        options={{ title: t("HeatComparator") }}
      />
      <ComparatorDrawer.Screen
        name="HouseholdApplianceComparator"
        component={Comparator}
        initialParams={{ type: "electromenager" } as ComparatorParams}
        options={{ title: t("HouseholdApplianceComparator") }}
      />
      <ComparatorDrawer.Screen
        name="MealComparator"
        component={Comparator}
        initialParams={{ type: "repas" } as ComparatorParams}
        options={{ title: t("MealComparator") }}
      />
      <ComparatorDrawer.Screen
        name="DrinkComparator"
        component={Comparator}
        initialParams={{ type: "boisson" } as ComparatorParams}
        options={{ title: t("DrinkComparator") }}
      />
      <ComparatorDrawer.Screen
        name="FruitsAndVegetablesComparator"
        component={Comparator}
        initialParams={{ type: "fruitsetlegumes" } as ComparatorParams}
        options={{ title: t("FruitsAndVegetablesComparator") }}
      />
      <ComparatorDrawer.Screen
        name="ClothingComparator"
        component={Comparator}
        initialParams={{ type: "habillement" } as ComparatorParams}
        options={{ title: t("ClothingComparator") }}
      />
      <ComparatorDrawer.Screen
        name="ShippingComparator"
        component={Comparator}
        initialParams={{ type: "livraison" } as ComparatorParams}
        options={{ title: t("ShippingComparator") }}
      />
      <ComparatorDrawer.Screen
        name="TransportComparator"
        component={Comparator}
        initialParams={{ type: "transport" } as ComparatorParams}
        options={{ title: t("TransportComparator") }}
      />
    </ComparatorDrawer.Navigator>
  );
};
