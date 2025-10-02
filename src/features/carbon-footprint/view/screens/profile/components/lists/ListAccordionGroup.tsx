import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PropsWithChildren } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { List } from "react-native-paper";

import { useProfileScroll } from "@carbonFootprint/domain/hooks/useProfileScroll";
import { CustomBottomSheet } from "@carbonFootprint/view/components/BottomSheet";
import { ScrollProfileSectionContext } from "@carbonFootprint/view/screens/profile/ScrollProfileSectionContext";
import { BottomSheetProvider } from "@common/context/BottomSheetContext";

export const ListAccordionGroup = ({ children }: PropsWithChildren) => {
  const {
    handleExpandProfileSection,
    resetExpandedSection,
    scrollViewRef,
    sectionRefs,
    expandedId,
  } = useProfileScroll();

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
            <KeyboardAwareScrollView
              ref={scrollViewRef}
              style={{
                // NB: fixed height is necessary to make scrollTo() and BottomSheet work properly
                height: 0,
              }}
              bottomOffset={15}
            >
              {children}
            </KeyboardAwareScrollView>
          </List.AccordionGroup>
        </ScrollProfileSectionContext.Provider>
        <CustomBottomSheet style={{}} />
      </BottomSheetProvider>
    </BottomSheetModalProvider>
  );
};
