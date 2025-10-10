import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { ContactScreen } from "@app/pages/ContactScreen";
import { DataPolicy } from "@app/pages/DataPolicy";
import { FollowUsScreen } from "@app/pages/FollowUsScreen";
import { Menu } from "@app/pages/Menu";
import { RateAppScreen } from "@app/pages/RateAppScreen";
import { Sources } from "@app/pages/Sources";
import { ThemeSetting } from "@app/pages/ThemeSetting";

type MenuStackParamList = {
  MenuHome: undefined;
  ThemeSetting: undefined;
  ContactScreen: undefined;
  RateAppScreen: undefined;
  FollowUsScreen: undefined;
  DataPolicy: undefined;
  Sources: undefined;
};

export type MenuNavigationProp = StackNavigationProp<MenuStackParamList>;

const MenuStack = createStackNavigator<MenuStackParamList>();

export const MenuNavigator = () => {
  const { t } = useTranslation("pages");

  return (
    <MenuStack.Navigator initialRouteName="MenuHome">
      <MenuStack.Screen
        name="MenuHome"
        component={Menu}
        options={{ title: t("Menu") }}
      />
      <MenuStack.Screen
        name="ThemeSetting"
        component={ThemeSetting}
        options={{ title: t("Theme") }}
      />
      <MenuStack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ title: t("Contact") }}
      />
      <MenuStack.Screen
        name="RateAppScreen"
        component={RateAppScreen}
        options={{ title: t("RateApp") }}
      />
      <MenuStack.Screen
        name="FollowUsScreen"
        component={FollowUsScreen}
        options={{ title: t("FollowUs") }}
      />
      <MenuStack.Screen
        name="DataPolicy"
        component={DataPolicy}
        options={{ title: t("DataPolicy") }}
      />
      <MenuStack.Screen
        name="Sources"
        component={Sources}
        options={{ title: t("Sources") }}
      />
    </MenuStack.Navigator>
  );
};
