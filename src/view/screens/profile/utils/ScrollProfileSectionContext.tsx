import { createContext, RefObject, useContext } from "react";
import { ScrollView, View } from "react-native";

interface ScrollProfileSectionContextType {
  expandedId: string | number | undefined;
  scrollViewRef: RefObject<ScrollView | null>;
  sectionRefs: RefObject<{ [key: string]: View | null }>;
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
