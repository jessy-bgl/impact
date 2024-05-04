import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import EmptyBox from "@assets/images/empty_box.svg";
import { Action, ActionState } from "@domain/entities/actions/Action";
import { ActionCard } from "@view/screens/actions/ActionCard";
import { useActions } from "@view/screens/actions/useActions";

const Tab = createMaterialTopTabNavigator();

export const Actions = () => {
  const {
    updateActionState,
    footprints,
    notStartedActions,
    inProgressActions,
    completedActions,
    skippedActions,
  } = useActions();

  const { t } = useTranslation("actions");
  const { colors } = useTheme();

  const ActionsList = ({
    actions,
    state,
  }: {
    actions: Action[];
    state: ActionState;
  }) => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {actions.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <EmptyBox height={60} width={60} />
          <Text>{t(`noAction.${state}`)}</Text>
        </View>
      ) : (
        <View style={styles.gridContainer}>
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

  const ActionsBadge = ({ text }: { text: string | number }) => (
    <View
      style={{
        marginTop: 5,
        marginRight: 20,
        width: 16,
        height: 16,
        borderRadius: 12,
        backgroundColor: colors.surfaceVariant,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text adjustsFontSizeToFit style={{ color: colors.onSurfaceVariant }}>
        {text}
      </Text>
    </View>
  );

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name={"notStartedActions"}
        options={{
          title: t("actionsList"),
          tabBarBadge: () => <ActionsBadge text={notStartedActions.length} />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="apps" color={color} size={20} />
          ),
        }}
      >
        {() => <ActionsList actions={notStartedActions} state="notStarted" />}
      </Tab.Screen>
      <Tab.Screen
        name={"inProgressActions"}
        options={{
          title: t("actionsInProgress"),
          tabBarBadge: () => <ActionsBadge text={inProgressActions.length} />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sync" color={color} size={20} />
          ),
        }}
      >
        {() => <ActionsList actions={inProgressActions} state="inProgress" />}
      </Tab.Screen>
      <Tab.Screen
        name={"completedActions"}
        options={{
          title: t("actionsCompleted"),
          tabBarBadge: () => <ActionsBadge text={completedActions.length} />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="check-circle-outline"
              color={color}
              size={20}
            />
          ),
        }}
      >
        {() => <ActionsList actions={completedActions} state="completed" />}
      </Tab.Screen>
      <Tab.Screen
        name={"skippedActions"}
        options={{
          title: t("actionsSkipped"),
          tabBarBadge: () => <ActionsBadge text={skippedActions.length} />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="remove-circle-outline"
              color={color}
              size={20}
            />
          ),
        }}
      >
        {() => <ActionsList actions={skippedActions} state="skipped" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
});
