import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { WasteSectionContent } from "@carbonFootprint/view/screens/profile/food/waste/WasteSectionContent";
import { useAppStore } from "@common/store/useStore";

export const WasteSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.wasteFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.food.waste,
  );

  return (
    <ListAccordion
      title={t("emissions:food.waste")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="recycle"
      completed={isCompleted}
    >
      <WasteSectionContent />
    </ListAccordion>
  );
};
