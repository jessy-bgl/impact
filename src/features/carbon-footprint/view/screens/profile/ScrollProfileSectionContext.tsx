import { createContext, useContext } from "react";
import { View } from "react-native";

interface ScrollProfileSectionContextType {
  registerSectionRef: (id: string, ref: View | null) => void;
  resetExpandedSection: () => void;
}

export const ScrollProfileSectionContext = createContext<
  ScrollProfileSectionContextType | undefined
>(undefined);

export const useScrollProfileSection = () => {
  const context = useContext(ScrollProfileSectionContext);

  if (context === undefined) {
    throw new Error(
      "useScrollProfileSection must be used within a ScrollProfileSectionProvider",
    );
  }

  return context;
};
