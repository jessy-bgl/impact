import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useTheme } from "react-native-paper";

type BottomSheetContent = ReactNode;

interface BottomSheetContextType {
  present: (content: BottomSheetContent) => void;
  dismiss: () => void;
  bottomSheetContent: BottomSheetContent | null;
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [bottomSheetContent, setBottomSheetContent] =
    useState<BottomSheetContent | null>(null);

  const present = useCallback((content: BottomSheetContent) => {
    setBottomSheetContent(content);
    bottomSheetRef.current?.present();
  }, []);

  const dismiss = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const value = {
    present,
    dismiss,
    bottomSheetContent,
    bottomSheetRef,
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetContext.Provider value={value}>
        {children}
        <CustomBottomSheet />
      </BottomSheetContext.Provider>
    </BottomSheetModalProvider>
  );
};

const CustomBottomSheet = () => {
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

export const useCustomBottomSheetModal = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};
