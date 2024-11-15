import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { PlaneSectionContent } from "@view/screens/profile/transport/plane/PlaneSectionContent";

export const PlaneSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.planeFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.plane")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="airplane"
    >
      <PlaneSectionContent />
    </ListAccordion>
  );
};
