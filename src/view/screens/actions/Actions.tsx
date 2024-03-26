import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import { ActionState } from "@domain/entities/actions/Action";
import { ActionCard } from "@view/screens/actions/ActionCard";
import { useActions } from "@view/screens/actions/useActions";

export const Actions = () => {
  const {
    actionsToDisplay,
    updateActionState,
    footprints,
    setActionStateToDisplay,
  } = useActions();

  const { colors } = useTheme();

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
            label="Toutes"
            icon="apps"
            onPress={() => setActionStateToDisplay(undefined)}
          >
            {actionsView}
          </TabScreen>
          <TabScreen
            label="En cours"
            icon="sync"
            onPress={() => setActionStateToDisplay("inProgress")}
          >
            {actionsView}
          </TabScreen>
          <TabScreen
            label="Complétées"
            icon="check-circle-outline"
            onPress={() => setActionStateToDisplay("completed")}
          >
            {actionsView}
          </TabScreen>
          <TabScreen
            label="Ecartées"
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
});
