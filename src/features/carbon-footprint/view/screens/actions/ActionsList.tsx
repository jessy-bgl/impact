import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View, useWindowDimensions } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import {
  Action,
  ActionState,
} from "@carbonFootprint/domain/entities/action/Action";
import { ACTIONS_TOUR_STEP_IDS } from "@carbonFootprint/domain/entities/tour/actionsTour";
import { useActionsInState } from "@carbonFootprint/domain/hooks/useActions";
import { ActionCard } from "@carbonFootprint/view/screens/actions/ActionCard";
import { useTourStepEffect } from "@common/tour/useTourStepEffect";
import { getImageAsset } from "@common/utils/imageAssets";

const maxCardWidth = 300;
const listPadding = 10;
const cardGap = 10;

type Props = {
  state: ActionState;
  isLoading: boolean;
  changeActionState: (action: Action, state: ActionState) => void;
};

export const ActionsList = ({ state, isLoading, changeActionState }: Props) => {
  const { t } = useTranslation("actions");

  const actions = useActionsInState(state);

  // The tour explains the first available action: bring it back into view,
  // the list may have been scrolled far enough to unmount it.
  const listRef = useRef<FlatList<Action>>(null);
  useTourStepEffect(ACTIONS_TOUR_STEP_IDS.savings, () => {
    if (state !== "notStarted") return;
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  });

  const { width } = useWindowDimensions();
  const availableWidth = width - listPadding * 2;
  const columns = Math.max(
    1,
    Math.floor((availableWidth + cardGap) / (maxCardWidth + cardGap)),
  );
  const cardWidth = Math.min(
    maxCardWidth,
    (availableWidth - cardGap * (columns - 1)) / columns,
  );

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
      width={cardWidth}
      updateState={(newState: ActionState) =>
        changeActionState(action, newState)
      }
    />
  );

  return (
    <FlatList
      ref={listRef}
      key={columns}
      numColumns={columns}
      columnWrapperStyle={
        columns > 1 ? { gap: cardGap, justifyContent: "center" } : undefined
      }
      data={actions}
      renderItem={renderActionCardItem}
      keyExtractor={(action) => action.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: listPadding,
        alignItems: columns > 1 ? undefined : "center",
        gap: cardGap,
      }}
    />
  );
};
