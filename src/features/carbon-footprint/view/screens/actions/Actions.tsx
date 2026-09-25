import { MaterialIcons } from "@expo/vector-icons";
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { ActionState } from "@carbonFootprint/domain/entities/action/Action";
import {
  ACTIONS_TOUR_SCREEN,
  ACTIONS_TOUR_STEP_IDS,
  ACTIONS_TOUR_TARGETS,
} from "@carbonFootprint/domain/entities/tour/actionsTour";
import { useActions } from "@carbonFootprint/domain/hooks/useActions";
import { BottomSheetHost } from "@carbonFootprint/view/components/BottomSheet";
import { ActionsList } from "@carbonFootprint/view/screens/actions/ActionsList";
import { useAppStore } from "@common/store/useStore";
import { useTourStepAvailability } from "@common/tour/useTourStepAvailability";
import { useTourTarget } from "@common/tour/useTourTarget";

export type ActionsTabParamList = {
  notStartedActions: undefined;
  inProgressActions: undefined;
  skippedActions: undefined;
};

const Tab = createMaterialTopTabNavigator<ActionsTabParamList>();

/**
 * Explaining an action takes one. While the actions load, the card steps are
 * kept: dropping them then re-inserting them mid-tour would skip them.
 */
const useCardTourStepsAvailability = (
  isLoading: boolean,
  hasAvailableAction: boolean,
) => {
  const available = isLoading || hasAvailableAction;

  useTourStepAvailability(ACTIONS_TOUR_STEP_IDS.savings, available);
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

  const { isLoading, hasAvailableAction, updateActionState } = useActions();

  useCardTourStepsAvailability(isLoading, hasAvailableAction);

  return (
    <BottomSheetHost>
      <Tab.Navigator tabBar={renderTabBar}>
        <Tab.Screen
          name={ACTIONS_TOUR_SCREEN}
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
    </BottomSheetHost>
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
