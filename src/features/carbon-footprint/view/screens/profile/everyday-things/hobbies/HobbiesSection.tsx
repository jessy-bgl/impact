import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { HobbiesSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/hobbies/HobbiesSectionContent";
import { useAppStore } from "@common/store/useStore";

export const HobbiesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.hobbiesFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.hobbies,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.hobbies")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bike"
      completed={isCompleted}
    >
      <HobbiesSectionContent />
    </ListAccordion>
  );
};
