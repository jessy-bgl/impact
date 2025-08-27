import { useTranslation } from "react-i18next";

import { useAppStore } from "@carbonFootprint/data/store/store";
import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { ClothesSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/clothes/ClothesSectionContent";

export const ClothesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.clothesFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.clothes,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.clothes")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="tshirt-crew"
      completed={isCompleted}
    >
      <ClothesSectionContent />
    </ListAccordion>
  );
};
