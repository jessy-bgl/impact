import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmissionsSummary } from "@carbonFootprint/view/screens/emissions/EmissionsSummary";
import { EmissionsHistory } from "@carbonFootprint/view/screens/history/EmissionsHistory";

const Tab = createMaterialTopTabNavigator();

// Metro folds `__DEV__` before collecting dependencies, so a release bundle
// never includes the preview picker or its fake datasets.
const HistoryScreen: ComponentType = __DEV__
  ? // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@carbonFootprint/view/screens/history/DevEmissionsHistory")
      .DevEmissionsHistory
  : EmissionsHistory;

export const Emissions = () => {
  const { t } = useTranslation("emissions");

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Tab.Navigator>
        <Tab.Screen
          name="distribution"
          component={EmissionsSummary}
          options={{
            title: t("tabs.distribution"),
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="pie-chart" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="history"
          component={HistoryScreen}
          options={{
            title: t("tabs.history"),
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="show-chart" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
