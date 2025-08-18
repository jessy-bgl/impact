import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { TobaccoSectionContent } from "@view/screens/profile/everyday-things/tobacco/TobaccoSectionContent";

export const TobaccoSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.tobaccoFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.tobacco,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.tobacco")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="smoking"
      completed={isCompleted}
    >
      <TobaccoSectionContent />
    </ListAccordion>
  );
};
