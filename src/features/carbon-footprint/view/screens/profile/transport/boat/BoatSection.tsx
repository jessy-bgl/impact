import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { BoatSectionContent } from "@carbonFootprint/view/screens/profile/transport/boat/BoatSectionContent";
import { useAppStore } from "@common/store/useStore";

export const BoatSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.boatFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.transport.boat,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.boat")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="ferry"
      completed={isCompleted}
    >
      <BoatSectionContent />
    </ListAccordion>
  );
};
