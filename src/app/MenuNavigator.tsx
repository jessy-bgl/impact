import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { ContactScreen } from "@app/pages/ContactScreen";
import { FollowUsScreen } from "@app/pages/FollowUsScreen";
import { Menu } from "@app/pages/Menu";
import { MyDataScreen } from "@app/pages/MyDataScreen";
import { RateAppScreen } from "@app/pages/RateAppScreen";
import { SourcesScreen } from "@app/pages/SourcesScreen";
import { ThemeScreen } from "@app/pages/ThemeScreen";

const MenuStack = createStackNavigator();

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
        name="ThemeScreen"
        component={ThemeScreen}
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
        name="MyDataScreen"
        component={MyDataScreen}
        options={{ title: t("MyData") }}
      />
      <MenuStack.Screen
        name="SourcesScreen"
        component={SourcesScreen}
        options={{ title: t("Sources") }}
      />
    </MenuStack.Navigator>
  );
};
