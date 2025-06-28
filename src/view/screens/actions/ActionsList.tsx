import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";

import EmptyBox from "@assets/images/empty_box";
import { useAppStore } from "@data/store/store";
import { Action, ActionState } from "@domain/entities/action/Action";
import { ActionCard } from "@view/screens/actions/ActionCard";

type Props = {
  state: ActionState;
  updateActionState: (id: string, state: ActionState) => void;
};

export const ActionsList = ({ state, updateActionState }: Props) => {
  const { t } = useTranslation("actions");

  const actions = useAppStore((store) => store.actions).filter(
    (action) => action.state === state,
  );

  // This is a workaround to improve performance (mainly for Profil screen)
  const isFocused = useIsFocused();
  if (!isFocused) return null;

  if (actions.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <EmptyBox height={50} width={50} />
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
        flexGrow: 1,
        paddingVertical: 20,
        alignItems: "center",
        gap: 15,
      }}
    />
  );
};
