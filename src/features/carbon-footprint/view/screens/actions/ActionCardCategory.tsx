import { useState } from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/FootprintViewModel";
import { InfoModal } from "@carbonFootprint/view/components/InfoModal";
import { InfoModalState } from "@carbonFootprint/view/screens/profile/types";

type Props = {
  action: Action;
  footprintViewModel: FootprintCategoryViewModel;
};

export const ActionCardCategory = ({ action, footprintViewModel }: Props) => {
  const { colors, roundness } = useTheme();

  const [modal, setModal] = useState<InfoModalState>({ show: false });

  return (
    <>
      {modal.show && (
        <InfoModal
          content={modal.content}
          hide={() => setModal({ show: false })}
        />
      )}

      <View
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
          onPress={() => {
            setModal({
              show: true,
              content: action.description,
            });
          }}
        />
      </View>
    </>
  );
};
