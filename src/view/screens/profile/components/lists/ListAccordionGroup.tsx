import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { BottomSheetProvider } from "@common/BottomSheetContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { CustomBottomSheet } from "@view/components/BottomSheet";
import { ScrollProfileSectionContext } from "@view/screens/profile/utils/ScrollProfileSectionContext";
import { useScrollProfile } from "@view/screens/profile/utils/useScrollProfile";

export const ListAccordionGroup = ({ children }: PropsWithChildren) => {
  const {
    handleExpandProfileSection,
    resetExpandedSection,
    scrollViewRef,
    sectionRefs,
    expandedId,
  } = useScrollProfile();

  return (
    <BottomSheetModalProvider>
      <BottomSheetProvider>
        <ScrollProfileSectionContext.Provider
          value={{
            sectionRefs,
            resetExpandedSection,
          }}
        >
          <List.AccordionGroup
            expandedId={expandedId}
            onAccordionPress={handleExpandProfileSection}
          >
            <ScrollView
              ref={scrollViewRef}
              style={{
                // NB: fixed height is necessary to make scrollTo() and BottomSheet work properly
                height: 0,
              }}
            >
              {children}
            </ScrollView>
          </List.AccordionGroup>
        </ScrollProfileSectionContext.Provider>
        <CustomBottomSheet style={{}} />
      </BottomSheetProvider>
    </BottomSheetModalProvider>
  );
};
