import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { HobbiesSectionContent } from "@view/screens/profile/everyday-things/hobbies/HobbiesSectionContent";

export const HobbiesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.hobbiesFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.hobbies")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bike"
    >
      <HobbiesSectionContent />
    </ListAccordion>
  );
};
