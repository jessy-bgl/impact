import { Ref } from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";

type Props = {
  action: Action;
  footprintViewModel: FootprintCategoryViewModel;
  tourRef?: Ref<View>;
};

export const ActionCardCategory = ({
  action,
  footprintViewModel,
  tourRef,
}: Props) => {
  const { colors, roundness } = useTheme();

  const { present } = useCustomBottomSheetModal();

  return (
    <View
      ref={tourRef}
      collapsable={false}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: footprintViewModel.color,
        borderTopRightRadius: roundness,
        borderBottomLeftRadius: roundness,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <IconButton
        icon={footprintViewModel.materialIcon}
        size={25}
        iconColor={colors.surfaceVariant}
        onPress={() => present(<Text>{action.description}</Text>)}
      />
    </View>
  );
};
