import { MaterialIcons } from "@expo/vector-icons";
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ComponentProps, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Badge, Snackbar, useTheme } from "react-native-paper";

import {
  Action,
  ActionState,
} from "@carbonFootprint/domain/entities/action/Action";
import {
  ACTIONS_TOUR_SCREEN,
  ACTIONS_TOUR_STEP_IDS,
  ACTIONS_TOUR_TARGETS,
} from "@carbonFootprint/domain/entities/tour/actionsTour";
import {
  useActions,
  useActionsInState,
} from "@carbonFootprint/domain/hooks/useActions";
import { ActionsList } from "@carbonFootprint/view/screens/actions/ActionsList";
import { posthog } from "@common/config/posthog";
import { BottomSheetProvider } from "@common/context/BottomSheetContext";
import { useTopTabsColors } from "@common/navigation/useTopTabsColors";
import { useTourStepAvailability } from "@common/tour/useTourStepAvailability";
import { useTourTarget } from "@common/tour/useTourTarget";

export type ActionsTabParamList = {
  notStartedActions: undefined;
  inProgressActions: undefined;
  skippedActions: undefined;
};

const Tab = createMaterialTopTabNavigator<ActionsTabParamList>();

type StateChange = { actionId: string; from: ActionState; to: ActionState };

/**
 * Explaining an action takes one, and explaining its savings takes known
 * ones: the card shows none otherwise. While the actions load, the card steps
 * are kept: dropping them then re-inserting them mid-tour would skip them.
 */
const useCardTourStepsAvailability = (
  isLoading: boolean,
  hasAvailableAction: boolean,
  hasFirstAvailableActionSavings: boolean,
) => {
  const available = isLoading || hasAvailableAction;

  useTourStepAvailability(
    ACTIONS_TOUR_STEP_IDS.savings,
    isLoading || hasFirstAvailableActionSavings,
  );
  useTourStepAvailability(ACTIONS_TOUR_STEP_IDS.category, available);
  useTourStepAvailability(ACTIONS_TOUR_STEP_IDS.buttons, available);
};

const ActionsTabBar = (props: MaterialTopTabBarProps) => {
  const tabsTourRef = useTourTarget(ACTIONS_TOUR_TARGETS.tabs);

  return (
    <View ref={tabsTourRef} collapsable={false}>
      <MaterialTopTabBar {...props} />
    </View>
  );
};

const renderTabBar = (props: MaterialTopTabBarProps) => (
  <ActionsTabBar {...props} />
);

export const Actions = () => {
  const { t } = useTranslation("actions");

  const {
    isLoading,
    hasAvailableAction,
    hasFirstAvailableActionSavings,
    updateActionState,
  } = useActions();

  useCardTourStepsAvailability(
    isLoading,
    hasAvailableAction,
    hasFirstAvailableActionSavings,
  );

  const topTabsColors = useTopTabsColors();

  const [lastChange, setLastChange] = useState<StateChange>();
  const [changeCount, setChangeCount] = useState(0);

  const changeActionState = (action: Action, state: ActionState) => {
    setLastChange({ actionId: action.id, from: action.state, to: state });
    setChangeCount((count) => count + 1);
    updateActionState(action.id, state);
  };

  const undoLastChange = () => {
    if (!lastChange) return;
    posthog.capture("action_change_undone", { state: lastChange.to });
    updateActionState(lastChange.actionId, lastChange.from);
  };

  return (
    <BottomSheetProvider>
      <Tab.Navigator tabBar={renderTabBar} screenOptions={topTabsColors}>
        <Tab.Screen
          name={ACTIONS_TOUR_SCREEN}
          options={{
            title: t("actionsList"),
            tabBarIcon: ({ color }) => (
              <ActionsTabIcon
                icon="apps"
                color={color}
                state="notStarted"
                showCount={!isLoading}
              />
            ),
          }}
        >
          {() => (
            <ActionsList
              state="notStarted"
              isLoading={isLoading}
              changeActionState={changeActionState}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="inProgressActions"
          options={{
            title: t("actionsInProgress"),
            tabBarIcon: ({ color }) => (
              <ActionsTabIcon
                icon="sync"
                color={color}
                state="inProgress"
                showCount={!isLoading}
              />
            ),
          }}
        >
          {() => (
            <ActionsList
              state="inProgress"
              isLoading={isLoading}
              changeActionState={changeActionState}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="skippedActions"
          options={{
            title: t("actionsSkipped"),
            tabBarIcon: ({ color }) => (
              <ActionsTabIcon
                icon="remove-circle-outline"
                color={color}
                state="skipped"
                showCount={!isLoading}
              />
            ),
          }}
        >
          {() => (
            <ActionsList
              state="skipped"
              isLoading={isLoading}
              changeActionState={changeActionState}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      <Snackbar
        // Paper only starts its timer when the Snackbar shows: a new one per
        // change gives each change its full duration to be undone.
        key={changeCount}
        visible={lastChange !== undefined}
        onDismiss={() => setLastChange(undefined)}
        // Paper pads it by the bottom safe area, which the tab bar under it
        // already takes care of.
        wrapperStyle={{ paddingBottom: 0 }}
        action={{ label: t("undo"), onPress: undoLastChange }}
      >
        {lastChange && t(`stateChanged.${lastChange.to}`)}
      </Snackbar>
    </BottomSheetProvider>
  );
};

/** The tab's icon, with its action count on it once there is one to show. */
const ActionsTabIcon = ({
  icon,
  color,
  state,
  showCount,
}: {
  icon: ComponentProps<typeof MaterialIcons>["name"];
  color: string;
  state: ActionState;
  showCount: boolean;
}) => {
  const { colors } = useTheme();

  const actionsCounter = useActionsInState(state).length;

  return (
    <View>
      <MaterialIcons name={icon} color={color} size={20} />
      <View style={{ position: "absolute", top: -6, left: 12, width: 32 }}>
        <Badge
          visible={showCount && actionsCounter > 0}
          size={16}
          style={{
            alignSelf: "flex-start",
            fontSize: 11,
            backgroundColor: colors.surfaceVariant,
            color: colors.onSurfaceVariant,
          }}
        >
          {actionsCounter}
        </Badge>
      </View>
    </View>
  );
};
