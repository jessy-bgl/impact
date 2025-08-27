import { useTranslation } from "react-i18next";

import { useAppStore } from "@carbonFootprint/data/store/store";
import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { PlaneSectionContent } from "@carbonFootprint/view/screens/profile/transport/plane/PlaneSectionContent";

export const PlaneSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.planeFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.transport.plane,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.plane")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="airplane"
      completed={isCompleted}
    >
      <PlaneSectionContent />
    </ListAccordion>
  );
};
