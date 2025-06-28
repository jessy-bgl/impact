import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

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
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useCustomBottomSheetModal = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};
