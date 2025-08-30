import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { TobaccoSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/tobacco/TobaccoSectionContent";
import { useAppStore } from "@common/store/useStore";

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
