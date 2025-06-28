import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { FurnitureSectionContent } from "@view/screens/profile/everyday-things/furniture/FurnitureSectionContent";

export const FurnitureSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.furnitureFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.furniture")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bed"
    >
      <FurnitureSectionContent />
    </ListAccordion>
  );
};
