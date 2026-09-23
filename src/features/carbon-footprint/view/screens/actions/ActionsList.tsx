import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import {
  Action,
  ActionState,
} from "@carbonFootprint/domain/entities/action/Action";
import { ACTIONS_TOUR_STEP_IDS } from "@carbonFootprint/domain/entities/tour/actionsTour";
import { ActionCard } from "@carbonFootprint/view/screens/actions/ActionCard";
import { useAppStore } from "@common/store/useStore";
import { useTourStepEffect } from "@common/tour/useTourStepEffect";
import { getImageAsset } from "@common/utils/imageAssets";

type Props = {
  state: ActionState;
  isLoading: boolean;
  updateActionState: (id: string, state: ActionState) => void;
};

export const ActionsList = ({ state, isLoading, updateActionState }: Props) => {
  const { t } = useTranslation("actions");

  const actions = useAppStore((store) => store.actions).filter(
    (action) => action.state === state,
  );

  // The tour explains the first available action: bring it back into view,
  // the list may have been scrolled far enough to unmount it.
  const listRef = useRef<FlatList<Action>>(null);
  useTourStepEffect(ACTIONS_TOUR_STEP_IDS.savings, () => {
    if (state !== "notStarted") return;
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  });

  // This is a workaround to improve performance (mainly for Profil screen)
  const isFocused = useIsFocused();
  if (!isFocused) return null;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>{t("loading")}</Text>
      </View>
    );
  }

  if (actions.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={getImageAsset("empty_box")}
          style={{ height: 50, width: 50 }}
        />
        <Text>{t(`noAction.${state}`)}</Text>
      </View>
    );

  const renderActionCardItem = ({
    item: action,
    index,
  }: {
    item: Action;
    index: number;
  }) => (
    <ActionCard
      key={action.id}
      action={action}
      isTourTarget={state === "notStarted" && index === 0}
      updateState={(newState: ActionState) =>
        updateActionState(action.id, newState)
      }
    />
  );

  return (
    <FlatList
      ref={listRef}
      numColumns={1}
      data={actions}
      renderItem={renderActionCardItem}
      keyExtractor={(action) => action.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 20,
        alignItems: "center",
        gap: 15,
      }}
    />
  );
};
