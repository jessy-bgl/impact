import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { Emissions } from "@app/pages/Emissions";
import { Profile } from "@app/pages/Profile";

import { EverydayThingsProfile } from "@carbonFootprint/view/screens/profile/everyday-things/EverydayThings";
import { FoodProfile } from "@carbonFootprint/view/screens/profile/food/Food";
import { HousingProfile } from "@carbonFootprint/view/screens/profile/housing/Housing";
import { SocietalServicesProfile } from "@carbonFootprint/view/screens/profile/public-services/SocietalServices";
import { TransportProfile } from "@carbonFootprint/view/screens/profile/transport/Transport";
import { ProfileTourHelpButton } from "@carbonFootprint/view/tour/ProfileTourHelpButton";

const EmissionsStack = createStackNavigator();

export type EmissionsStackParamList = {
  Emissions: undefined;
  Profile: undefined;
  TransportProfile: undefined;
  FoodProfile: undefined;
  HousingProfile: undefined;
  EverydayThingsProfile: undefined;
  SocietalServicesProfile: undefined;
};

export type EmissionsNavigatorProp =
  StackNavigationProp<EmissionsStackParamList>;

const renderProfileHelpIcon = () => <ProfileTourHelpButton />;

export const EmissionsNavigator = () => {
  const { t } = useTranslation("pages");

  return (
    <EmissionsStack.Navigator
      initialRouteName="Emissions"
      screenOptions={{ animation: "fade" }}
    >
      <EmissionsStack.Screen
        name="Emissions"
        component={Emissions}
        options={{ headerShown: false }}
      />
      <EmissionsStack.Screen
        name="Profile"
        component={Profile}
        // The screen sets its own header right side, next to its sync icon.
        options={{ title: t("Profile") }}
      />
      <EmissionsStack.Screen
        name="TransportProfile"
        component={TransportProfile}
        options={{
          title: t("Transport"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <EmissionsStack.Screen
        name="FoodProfile"
        component={FoodProfile}
        options={{
          title: t("Food"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <EmissionsStack.Screen
        name="HousingProfile"
        component={HousingProfile}
        options={{
          title: t("Housing"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <EmissionsStack.Screen
        name="EverydayThingsProfile"
        component={EverydayThingsProfile}
        options={{
          title: t("EverydayThings"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <EmissionsStack.Screen
        name="SocietalServicesProfile"
        component={SocietalServicesProfile}
        options={{ title: t("SocietalServices") }}
      />
    </EmissionsStack.Navigator>
  );
};
