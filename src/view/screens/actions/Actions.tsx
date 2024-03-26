import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import { ActionState } from "@domain/entities/actions/Action";
import { ActionCard } from "@view/screens/actions/ActionCard";
import { useActions } from "@view/screens/actions/useActions";
import { useTranslation } from "react-i18next";

export const Actions = () => {
  const {
    actionsToDisplay,
    updateActionState,
    footprints,
    setActionStateToDisplay,
  } = useActions();

  const { colors } = useTheme();

  const { t } = useTranslation("actions");

  const actionsView = (
    <View style={styles.gridContainer}>
      {actionsToDisplay.map((action) => (
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
  );

  return (
    <ScrollView>
      <TabsProvider defaultIndex={0}>
        <Tabs
          iconPosition="top"
          style={{ backgroundColor: colors.backdrop }}
          mode="scrollable"
          showLeadingSpace={false}
        >
          <TabScreen
            label={t("list")}
            icon="apps"
            onPress={() => setActionStateToDisplay("notStarted")}
          >
            {actionsView}
          </TabScreen>
          <TabScreen
            label={t("inProgress")}
            icon="sync"
            onPress={() => setActionStateToDisplay("inProgress")}
          >
            {actionsView}
          </TabScreen>
          <TabScreen
            label={t("completed")}
            icon="check-circle-outline"
            onPress={() => setActionStateToDisplay("completed")}
          >
            {actionsView}
          </TabScreen>
          <TabScreen
            label={t("skipped")}
            icon="close-circle-outline"
            onPress={() => setActionStateToDisplay("skipped")}
          >
            {actionsView}
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 10,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
});
