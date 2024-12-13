import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import EmptyBox from "@assets/images/empty_box.svg";
import { useAppStore } from "@data/store/store";
import { ActionState } from "@domain/entities/action/Action";
import { ActionCard } from "@view/screens/actions/ActionCard";
import { useActions } from "@view/screens/actions/useActions";

const Tab = createMaterialTopTabNavigator();

export const Actions = () => {
  const { t } = useTranslation("actions");

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
        {() => <ActionsList state="notStarted" />}
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
        {() => <ActionsList state="inProgress" />}
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
        {() => <ActionsList state="skipped" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const ActionsList = ({ state }: { state: ActionState }) => {
  const { updateActionState, footprints } = useActions();

  const actions = useAppStore((store) =>
    store.actions.filter((action) => action.state === state),
  );

  const { t } = useTranslation("actions");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {actions.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <EmptyBox height={50} width={50} />
          <Text>{t(`noAction.${state}`)}</Text>
        </View>
      ) : (
        <View
          style={{
            paddingVertical: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 15,
          }}
        >
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              footprintViewModel={footprints[action.category]}
              updateState={(newState: ActionState) =>
                updateActionState(action.id, newState)
              }
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const ActionsTabBadge = ({ state }: { state: ActionState }) => {
  const { colors } = useTheme();

  const actionsCounter = useAppStore(
    (store) => store.actions.filter((action) => action.state === state).length,
  );

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
