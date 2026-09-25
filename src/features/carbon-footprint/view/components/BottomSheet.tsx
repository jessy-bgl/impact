import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { PropsWithChildren, useCallback } from "react";
import { useTheme } from "react-native-paper";

import {
  BottomSheetProvider,
  useCustomBottomSheetModal,
} from "@common/context/BottomSheetContext";

export const CustomBottomSheet = () => {
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
      {/* Scrolls when a long description is taller than the screen */}
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingInline: 20,
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        {bottomSheetContent}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

/**
 * Lets the screen's descendants open the bottom sheet with
 * `useCustomBottomSheetModal().present()`.
 */
export const BottomSheetHost = ({ children }: PropsWithChildren) => (
  <BottomSheetModalProvider>
    <BottomSheetProvider>
      {children}
      <CustomBottomSheet />
    </BottomSheetProvider>
  </BottomSheetModalProvider>
);
