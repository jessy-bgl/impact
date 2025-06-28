import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { BoatSectionContent } from "@view/screens/profile/transport/boat/BoatSectionContent";

export const BoatSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.boatFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.boat")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="ferry"
    >
      <BoatSectionContent />
    </ListAccordion>
  );
};
