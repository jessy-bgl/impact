import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import {
  Action,
  ActionState,
} from "@carbonFootprint/domain/entities/action/Action";
import { ActionCard } from "@carbonFootprint/view/screens/actions/ActionCard";
import { useAppStore } from "@common/store/useStore";
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

  const renderActionCardItem = ({ item: action }: { item: Action }) => (
    <ActionCard
      key={action.id}
      action={action}
      updateState={(newState: ActionState) =>
        updateActionState(action.id, newState)
      }
    />
  );

  return (
    <FlatList
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
