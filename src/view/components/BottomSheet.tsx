import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import { ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

import { useCustomBottomSheetModal } from "../../BottomSheetContext";

type Props = {
  style?: ViewStyle;
};

export const CustomBottomSheet = ({ style }: Props) => {
  const { bottomSheetRef, bottomSheetContent, dismiss } =
    useCustomBottomSheetModal();

  const { colors } = useTheme();

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) dismiss();
    },
    [dismiss],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      enableOverDrag={false}
      style={{
        ...style,
        alignItems: "center",
        marginHorizontal: "auto",
      }}
      backgroundStyle={{
        backgroundColor: colors.surfaceVariant,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.onSurfaceVariant,
      }}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
    >
      <BottomSheetView
        style={{
          paddingInline: 20,
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        {bottomSheetContent}
      </BottomSheetView>
    </BottomSheetModal>
  );
};
