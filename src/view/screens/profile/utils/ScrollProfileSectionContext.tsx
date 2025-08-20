import { createContext, RefObject, useContext } from "react";
import { View } from "react-native";

interface ScrollProfileSectionContextType {
  sectionRefs: RefObject<{ [key: string]: View | null }>;
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
