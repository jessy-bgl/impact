import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { CustomBottomSheet } from "@view/components/BottomSheet";
import { ScrollProfileSectionContext } from "@view/screens/profile/utils/ScrollProfileSectionContext";
import { useScrollProfile } from "@view/screens/profile/utils/useScrollProfile";
import { BottomSheetProvider } from "../../../../../BottomSheetContext";

export const ListAccordionGroup = ({ children }: PropsWithChildren) => {
  const { handleExpandProfileSection, scrollViewRef, sectionRefs, expandedId } =
    useScrollProfile();

  return (
    <ScrollProfileSectionContext.Provider
      value={{ expandedId, scrollViewRef, sectionRefs }}
    >
      <BottomSheetModalProvider>
        <BottomSheetProvider>
          <ScrollView ref={scrollViewRef}>
            <List.AccordionGroup
              expandedId={expandedId}
              onAccordionPress={handleExpandProfileSection}
            >
              {children}
            </List.AccordionGroup>
          </ScrollView>
          <CustomBottomSheet style={{}} />
        </BottomSheetProvider>
      </BottomSheetModalProvider>
    </ScrollProfileSectionContext.Provider>
  );
};
