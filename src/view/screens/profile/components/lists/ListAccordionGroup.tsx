import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { ScrollProfileSectionContext } from "@view/screens/profile/utils/ScrollProfileSectionContext";
import { useScrollProfile } from "@view/screens/profile/utils/useScrollProfile";

export const ListAccordionGroup = ({ children }: PropsWithChildren) => {
  const { handleExpandProfileSection, scrollViewRef, sectionRefs, expandedId } =
    useScrollProfile();

  return (
    <ScrollProfileSectionContext.Provider
      value={{ expandedId, scrollViewRef, sectionRefs }}
    >
      <ScrollView ref={scrollViewRef}>
        <List.AccordionGroup
          expandedId={expandedId}
          onAccordionPress={handleExpandProfileSection}
        >
          {children}
        </List.AccordionGroup>
      </ScrollView>
    </ScrollProfileSectionContext.Provider>
  );
};
