import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { PublicTransportSectionContent } from "@view/screens/profile/transport/public-transport/PublicTransportSectionContent";

export const PublicTransportSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.publicTransportFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.public")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="train"
    >
      <PublicTransportSectionContent />
    </ListAccordion>
  );
};
