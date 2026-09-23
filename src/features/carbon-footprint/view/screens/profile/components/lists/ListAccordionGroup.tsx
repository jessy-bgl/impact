import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PropsWithChildren } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { List } from "react-native-paper";

import { useProfileScroll } from "@carbonFootprint/domain/hooks/useProfileScroll";
import { PROFILE_TOUR_STEP_IDS } from "@carbonFootprint/domain/entities/tour/profileTour";
import { CustomBottomSheet } from "@carbonFootprint/view/components/BottomSheet";
import { ProfileCompletionCelebrationProvider } from "@carbonFootprint/view/screens/profile/ProfileCompletionCelebrationContext";
import { ScrollProfileSectionContext } from "@carbonFootprint/view/screens/profile/ScrollProfileSectionContext";
import { BottomSheetProvider } from "@common/context/BottomSheetContext";
import { useTourScrollContainer } from "@common/tour/useTourScrollContainer";
import { useTourStepAction } from "@common/tour/useTourStepAction";
import { useTourStepEffect } from "@common/tour/useTourStepEffect";

export const ListAccordionGroup = ({ children }: PropsWithChildren) => {
  const {
    handleExpandProfileSection,
    resetExpandedSection,
    scrollViewRef,
    registerSectionRef,
    expandedId,
  } = useProfileScroll();

  // The tour asks the user to open a section themselves: start from a clean,
  // collapsed list so the spotlighted header is exactly one row.
  useTourStepEffect(PROFILE_TOUR_STEP_IDS.sectionHeader, resetExpandedSection);
  const completeSectionStep = useTourStepAction(
    PROFILE_TOUR_STEP_IDS.sectionHeader,
  );

  useTourScrollContainer(scrollViewRef);

  const handleAccordionPress = (id: string | number) => {
    handleExpandProfileSection(id);
    completeSectionStep();
  };

  return (
    <BottomSheetModalProvider>
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
              onAccordionPress={handleAccordionPress}
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
        <CustomBottomSheet />
      </BottomSheetProvider>
    </BottomSheetModalProvider>
  );
};
