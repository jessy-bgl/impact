import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { CustomBottomSheet } from "@carbonFootprint/view/components/BottomSheet";
import { ScrollProfileSectionContext } from "@carbonFootprint/view/screens/profile/ScrollProfileSectionContext";
import { useScrollProfile } from "@carbonFootprint/view/screens/profile/useScrollProfile";
import { BottomSheetProvider } from "@common/BottomSheetContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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
