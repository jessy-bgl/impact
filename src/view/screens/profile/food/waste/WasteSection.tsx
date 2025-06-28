import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { WasteSectionContent } from "@view/screens/profile/food/waste/WasteSectionContent";

export const WasteSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.wasteFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:food.waste")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="recycle"
    >
      <WasteSectionContent />
    </ListAccordion>
  );
};
