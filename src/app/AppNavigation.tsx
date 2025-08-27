import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  StackHeaderRightProps,
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { IconButton, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Actions } from "@app/pages/Actions";
import { Comparator } from "@app/pages/Comparator";
import { Emissions } from "@app/pages/Emissions";
import { Intro } from "@app/pages/Intro";
import { IntroActions } from "@app/pages/IntroActions";
import { Profile } from "@app/pages/Profile";

import { IntroProfile } from "@app/pages/IntroProfile";
import { useAppStore } from "@carbonFootprint/data/store/store";
import { appStoreActions } from "@carbonFootprint/data/store/storeActions";
import { AdemeComparatorType } from "@carbonFootprint/domain/entities/comparator/AdemeComparator";
import { Tracking } from "@carbonFootprint/view/screens/history/EmissionsHistory";
import { EverydayThingsProfile } from "@carbonFootprint/view/screens/profile/everyday-things/EverydayThings";
import { FoodProfile } from "@carbonFootprint/view/screens/profile/food/Food";
import { HousingProfile } from "@carbonFootprint/view/screens/profile/housing/Housing";
import { SocietalServicesProfile } from "@carbonFootprint/view/screens/profile/public-services/SocietalServices";
import { TransportProfile } from "@carbonFootprint/view/screens/profile/transport/Transport";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const ComparatorDrawer = createDrawerNavigator();

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  TransportProfile: undefined;
  FoodProfile: undefined;
  HousingProfile: undefined;
  EverydayThingsProfile: undefined;
  SocietalServicesProfile: undefined;
};

export type AppNavigationProp = StackNavigationProp<RootStackParamList>;

const iconSize = 24;

export const AppNavigation = () => {
  const { t } = useTranslation("pages");

  const shouldShowAppIntro = useAppStore((state) => state.shouldShowIntro.app);

  const shouldShowProfileIntro = useAppStore(
    (state) => state.shouldShowIntro.profile,
  );

  if (shouldShowAppIntro) return <Intro />;

  const { setShouldShowProfileIntro } = appStoreActions;

  const renderProfileHelpIcon = (props: StackHeaderRightProps) => (
    <IconButton
      {...props}
      icon="help-circle"
      size={iconSize}
      onPress={() => setShouldShowProfileIntro(!shouldShowProfileIntro)}
    />
  );

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ animation: "fade" }}
    >
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
        component={shouldShowProfileIntro ? IntroProfile : TransportProfile}
        options={{
          title: t("Transport"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <Stack.Screen
        name="FoodProfile"
        component={shouldShowProfileIntro ? IntroProfile : FoodProfile}
        options={{
          title: t("Food"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <Stack.Screen
        name="HousingProfile"
        component={shouldShowProfileIntro ? IntroProfile : HousingProfile}
        options={{
          title: t("Housing"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <Stack.Screen
        name="EverydayThingsProfile"
        component={
          shouldShowProfileIntro ? IntroProfile : EverydayThingsProfile
        }
        options={{
          title: t("EverydayThings"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <Stack.Screen
        name="SocietalServicesProfile"
        component={SocietalServicesProfile}
        options={{ title: t("SocietalServices") }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const { t } = useTranslation("pages");

  const shouldShowActionsIntro = useAppStore(
    (state) => state.shouldShowIntro.actions,
  );

  const { setShouldShowActionsIntro } = appStoreActions;

  const insets = useSafeAreaInsets();

  const tabBarStyle: BottomTabNavigationOptions["tabBarStyle"] = {
    height: 55 + insets.bottom,
    paddingBottom: insets.bottom,
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Emissions"
      screenOptions={{ tabBarStyle, tabBarLabelPosition: "below-icon" }}
    >
      <BottomTab.Screen
        name="Emissions"
        component={Emissions}
        options={{
          lazy: false,
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
        name="Tracking"
        component={Tracking}
        options={{
          title: t("Tracking"),
          headerTitle: t("TrackingEmissions"),
          tabBarIcon: ({ color }) => {
            return (
              <Icons
                name="chart-timeline-variant"
                size={iconSize}
                color={color}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Actions"
        component={shouldShowActionsIntro ? IntroActions : Actions}
        options={{
          lazy: false,
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
          headerRight: (props) => (
            <IconButton
              {...props}
              icon="help-circle"
              size={iconSize}
              onPress={() => setShouldShowActionsIntro(!shouldShowActionsIntro)}
            />
          ),
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

  const { colors } = useTheme();

  return (
    <ComparatorDrawer.Navigator
      initialRouteName="Converter"
      screenOptions={{
        headerTintColor: colors.onBackground,
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
