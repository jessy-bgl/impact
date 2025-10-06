import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ComparatorNavigator } from "@app/ComparatorNavigator";
import { EmissionsNavigator } from "@app/EmissionsNavigator";
import { MenuNavigator } from "@app/MenuNavigator";
import { Actions } from "@app/pages/Actions";
import { Intro } from "@app/pages/Intro";
import { IntroActions } from "@app/pages/IntroActions";

import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

const BottomTab = createBottomTabNavigator();

const iconSize = 24;

export const AppNavigator = () => {
  const shouldShowAppIntro = useAppStore((state) => state.shouldShowIntro.app);

  if (shouldShowAppIntro) return <Intro />;

  return <BottomTabNavigator />;
};

const BottomTabNavigator = () => {
  const { t } = useTranslation("pages");

  const shouldShowActionsIntro = useAppStore(
    (state) => state.shouldShowIntro.actions,
  );

  const { setShouldShowActionsIntro } = useContext(UsecasesContext);

  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      initialRouteName="Emissions"
      screenOptions={{
        tabBarStyle: { height: 55 + insets.bottom },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <BottomTab.Screen
        name="Emissions"
        component={EmissionsNavigator}
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
      <BottomTab.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          headerShown: false,
          title: t("Menu"),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icons
                name={focused ? "menu" : "menu"}
                size={iconSize}
                color={color}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
