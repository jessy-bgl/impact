import { useState } from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

import { Action } from "@domain/entities/action/Action";
import { InfoModal } from "@view/components/InfoModal";
import { InfoModalState } from "@view/screens/profile/utils/types";
import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

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
