import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ComparatorNavigator } from "@app/ComparatorNavigator";
import {
  EmissionsNavigator,
  EmissionsStackParamList,
} from "@app/EmissionsNavigator";
import { MenuNavigator } from "@app/MenuNavigator";
import { Actions } from "@app/pages/Actions";
import {
  ACTIONS_TOUR_SCREEN,
  ACTIONS_TOUR_TARGETS,
} from "@carbonFootprint/domain/entities/tour/actionsTour";
import { ActionsTabParamList } from "@carbonFootprint/view/screens/actions/Actions";
import { useActionsTour } from "@carbonFootprint/view/tour/ActionsTourContext";
import { useTourTarget } from "@common/tour/useTourTarget";

export type AppTabParamList = {
  Home: NavigatorScreenParams<EmissionsStackParamList>;
  Actions: NavigatorScreenParams<ActionsTabParamList> | undefined;
  Comparator: undefined;
  Menu: undefined;
};

const BottomTab = createBottomTabNavigator<AppTabParamList>();

const iconSize = 24;

const EmissionsTabIcon = ({
  focused,
  color,
}: {
  focused: boolean;
  color: string;
}) => {
  const { t } = useTranslation("pages");

  const emissionsTabTourRef = useTourTarget(ACTIONS_TOUR_TARGETS.emissionsTab, {
    label: t("Emissions"),
  });

  return (
    <View ref={emissionsTabTourRef} collapsable={false}>
      <Icons
        name={focused ? "home" : "home-outline"}
        size={iconSize}
        color={color}
      />
    </View>
  );
};

export const AppNavigator = () => {
  const { t } = useTranslation(["pages", "intro"]);

  const { startTour: startActionsTour } = useActionsTour();

  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { height: 55 + insets.bottom },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={EmissionsNavigator}
        options={{
          lazy: false,
          headerShown: false,
          title: t("pages:Emissions"),
          tabBarIcon: ({ focused, color }) => (
            <EmissionsTabIcon focused={focused} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Actions"
        component={Actions}
        options={({ navigation }) => ({
          lazy: false,
          title: t("pages:Actions"),
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
              accessibilityLabel={t("intro:tour.nav.help")}
              onPress={() => {
                // The whole tour runs on the available actions tab.
                navigation.navigate("Actions", { screen: ACTIONS_TOUR_SCREEN });
                startActionsTour("help_icon", {
                  screen: ACTIONS_TOUR_SCREEN,
                });
              }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="Comparator"
        component={ComparatorNavigator}
        options={{
          headerShown: false,
          title: t("pages:Comparator"),
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
          title: t("pages:Menu"),
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
