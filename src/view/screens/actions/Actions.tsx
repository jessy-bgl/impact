import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { ActionState } from "@domain/entities/action/Action";
import { ActionsList } from "@view/screens/actions/ActionsList";

const Tab = createMaterialTopTabNavigator();

export const Actions = () => {
  const { syncEngineWithStoredActions, updateActionState } =
    useContext(UsecasesContext);

  useEffect(() => {
    syncEngineWithStoredActions();
  }, [syncEngineWithStoredActions]);

  const { t } = useTranslation("actions");

  // NB: this is a workaround to improve performance (mainly for Profil screen)
  const isFocused = useIsFocused();
  if (!isFocused) return null;

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
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
      <Text adjustsFontSizeToFit style={{ color: colors.onSurfaceVariant }}>
        {actionsCounter}
      </Text>
    </View>
  );
};
