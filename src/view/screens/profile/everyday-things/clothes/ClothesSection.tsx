import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ClothesSectionContent } from "@view/screens/profile/everyday-things/clothes/ClothesSectionContent";

export const ClothesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.clothesFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.clothes")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="tshirt-crew"
    >
      <ClothesSectionContent />
    </ListAccordion>
  );
};
