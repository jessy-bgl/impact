import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";

import { Emissions } from "@carbonFootprint/view/screens/emissions/Emissions";
import { EmissionsHistory } from "@carbonFootprint/view/screens/history/EmissionsHistory";

const Tab = createMaterialTopTabNavigator();

export const EmissionsTabs = () => {
  const { t } = useTranslation("emissions");

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="distribution"
        component={Emissions}
        options={{
          title: t("tabs.distribution"),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pie-chart" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={EmissionsHistory}
        options={{
          title: t("tabs.history"),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="show-chart" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
