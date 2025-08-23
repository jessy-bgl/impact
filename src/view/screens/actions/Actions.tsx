import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { ActionState } from "@domain/entities/action/Action";
import { useIsFocused } from "@react-navigation/native";
import { ActionsList } from "@view/screens/actions/ActionsList";

const Tab = createMaterialTopTabNavigator();

export const Actions = () => {
  const { t } = useTranslation("actions");

  const [isLoading, setIsLoading] = useState(true);

  const { syncEngineWithStoredActions, updateActionState } =
    useContext(UsecasesContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    setTimeout(() => syncEngineWithStoredActions(), 0);
    setIsLoading(false);
    return () => setIsLoading(true);
  }, [syncEngineWithStoredActions, isFocused]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="notStartedActions"
        options={{
          title: t("actionsList"),
          tabBarBadge: isLoading
            ? undefined
            : () => <ActionsTabBadge state="notStarted" />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="apps" color={color} size={20} />
          ),
        }}
      >
        {() => (
          <ActionsList
            state="notStarted"
            isLoading={isLoading}
            updateActionState={updateActionState}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="inProgressActions"
        options={{
          title: t("actionsInProgress"),
          tabBarBadge: isLoading
            ? undefined
            : () => <ActionsTabBadge state="inProgress" />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sync" color={color} size={20} />
          ),
        }}
      >
        {() => (
          <ActionsList
            state="inProgress"
            isLoading={isLoading}
            updateActionState={updateActionState}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="skippedActions"
        options={{
          title: t("actionsSkipped"),
          tabBarBadge: isLoading
            ? undefined
            : () => <ActionsTabBadge state="skipped" />,
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
          <ActionsList
            state="skipped"
            isLoading={isLoading}
            updateActionState={updateActionState}
          />
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
