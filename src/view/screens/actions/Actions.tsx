import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { ActionState } from "@domain/entities/action/Action";
import { ActionsList } from "@view/screens/actions/ActionsList";

const Tab = createMaterialTopTabNavigator();

export const Actions = () => {
  const { t } = useTranslation("actions");

  const [isLoading, setIsLoading] = useState(true);

  const { syncEngineWithStoredActions, updateActionState } =
    useContext(UsecasesContext);

  useEffect(() => {
    // Allow the component to render with loading state first
    const timeoutId = setTimeout(() => {
      syncEngineWithStoredActions();
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [syncEngineWithStoredActions]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>{t("loading")}</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="notStartedActions"
        options={{
          title: t("actionsList"),
          tabBarBadge: () => <ActionsTabBadge state="notStarted" />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="apps" color={color} size={20} />
          ),
        }}
      >
        {() => (
          <ActionsList
            state="notStarted"
            updateActionState={updateActionState}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="inProgressActions"
        options={{
          title: t("actionsInProgress"),
          tabBarBadge: () => <ActionsTabBadge state="inProgress" />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sync" color={color} size={20} />
          ),
        }}
      >
        {() => (
          <ActionsList
            state="inProgress"
            updateActionState={updateActionState}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="skippedActions"
        options={{
          title: t("actionsSkipped"),
          tabBarBadge: () => <ActionsTabBadge state="skipped" />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="remove-circle-outline"
              color={color}
              size={20}
            />
          ),
        }}
      >
        {() => (
          <ActionsList state="skipped" updateActionState={updateActionState} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const ActionsTabBadge = ({ state }: { state: ActionState }) => {
  const { colors } = useTheme();

  const actionsCounter = useAppStore((store) => store.actions).filter(
    (action) => action.state === state,
  ).length;

  return (
    <View
      style={{
        marginTop: 5,
        marginRight: 15,
        width: 16,
        height: 16,
        borderRadius: 12,
        backgroundColor: colors.surfaceVariant,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 10 }}>{actionsCounter}</Text>
    </View>
  );
};
