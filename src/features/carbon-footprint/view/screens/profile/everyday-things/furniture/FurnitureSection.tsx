import { useTranslation } from "react-i18next";

import { useAppStore } from "@carbonFootprint/data/store/store";
import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { FurnitureSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/furniture/FurnitureSectionContent";

export const FurnitureSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.furnitureFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.furniture,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.furniture")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bed"
      completed={isCompleted}
    >
      <FurnitureSectionContent />
    </ListAccordion>
  );
};
