import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import { Action, ActionState } from "@domain/entities/actions/Action";
import { ActionCard } from "@view/screens/actions/ActionCard";
import { useActions } from "@view/screens/actions/useActions";

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

  const ActionsList = ({ actions }: { actions: Action[] }) => (
    <ScrollView showsVerticalScrollIndicator={false}>
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
    </ScrollView>
  );

  return (
    <TabsProvider>
      <Tabs iconPosition="top" showLeadingSpace={false} showTextLabel={false}>
        <TabScreen label={t("actionsList")} icon="apps">
          <ActionsList actions={notStartedActions} />
        </TabScreen>
        <TabScreen label={t("actionsInProgress")} icon="sync">
          <ActionsList actions={inProgressActions} />
        </TabScreen>
        <TabScreen label={t("actionsCompleted")} icon="check-circle-outline">
          <ActionsList actions={completedActions} />
        </TabScreen>
        <TabScreen label={t("actionsSkipped")} icon="close-circle-outline">
          <ActionsList actions={skippedActions} />
        </TabScreen>
      </Tabs>
    </TabsProvider>
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
