import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { LeisureSectionContent } from "@view/screens/profile/housing/leisure/LeisureSectionContent";

export const LeisureSection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.housing.leisureFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.housing.leisure,
  );

  return (
    <ListAccordion
      title={t("emissions:housing.leisure")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="beach"
      completed={isCompleted}
    >
      <LeisureSectionContent />
    </ListAccordion>
  );
};
