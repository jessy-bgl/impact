import {
  StackHeaderRightProps,
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";

import { Emissions } from "@app/pages/Emissions";
import { IntroProfile } from "@app/pages/IntroProfile";
import { Profile } from "@app/pages/Profile";

import { EverydayThingsProfile } from "@carbonFootprint/view/screens/profile/everyday-things/EverydayThings";
import { FoodProfile } from "@carbonFootprint/view/screens/profile/food/Food";
import { HousingProfile } from "@carbonFootprint/view/screens/profile/housing/Housing";
import { SocietalServicesProfile } from "@carbonFootprint/view/screens/profile/public-services/SocietalServices";
import { TransportProfile } from "@carbonFootprint/view/screens/profile/transport/Transport";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

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

const iconSize = 24;

export const EmissionsNavigator = () => {
  const { t } = useTranslation("pages");

  const shouldShowProfileIntro = useAppStore(
    (state) => state.shouldShowIntro.profile,
  );

  const { setShouldShowProfileIntro } = useContext(UsecasesContext);

  const renderProfileHelpIcon = (props: StackHeaderRightProps) => (
    <IconButton
      {...props}
      icon="help-circle"
      size={iconSize}
      onPress={() => setShouldShowProfileIntro(!shouldShowProfileIntro)}
    />
  );

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
        options={{ title: t("Profile") }}
      />
      <EmissionsStack.Screen
        name="TransportProfile"
        component={shouldShowProfileIntro ? IntroProfile : TransportProfile}
        options={{
          title: t("Transport"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <EmissionsStack.Screen
        name="FoodProfile"
        component={shouldShowProfileIntro ? IntroProfile : FoodProfile}
        options={{
          title: t("Food"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <EmissionsStack.Screen
        name="HousingProfile"
        component={shouldShowProfileIntro ? IntroProfile : HousingProfile}
        options={{
          title: t("Housing"),
          headerRight: renderProfileHelpIcon,
        }}
      />
      <EmissionsStack.Screen
        name="EverydayThingsProfile"
        component={
          shouldShowProfileIntro ? IntroProfile : EverydayThingsProfile
        }
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
