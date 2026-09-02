import { PropsWithChildren } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { List } from "react-native-paper";

import { useProfileScroll } from "@carbonFootprint/domain/hooks/useProfileScroll";
import { BottomSheetProvider } from "@common/context/BottomSheetContext";
import { ProfileCompletionCelebrationProvider } from "@carbonFootprint/view/screens/profile/ProfileCompletionCelebrationContext";
import { ScrollProfileSectionContext } from "@carbonFootprint/view/screens/profile/ScrollProfileSectionContext";

export const ListAccordionGroup = ({ children }: PropsWithChildren) => {
  const {
    handleExpandProfileSection,
    resetExpandedSection,
    scrollViewRef,
    registerSectionRef,
    expandedId,
  } = useProfileScroll();

  return (
    <BottomSheetProvider>
      <ScrollProfileSectionContext.Provider
        value={{
          registerSectionRef,
          resetExpandedSection,
        }}
      >
        <ProfileCompletionCelebrationProvider>
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
        </ProfileCompletionCelebrationProvider>
      </ScrollProfileSectionContext.Provider>
    </BottomSheetProvider>
  );
};
