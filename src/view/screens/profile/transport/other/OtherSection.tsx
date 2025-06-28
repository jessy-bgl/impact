import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { OtherSectionContent } from "@view/screens/profile/transport/other/OtherSectionContent";

export const OtherSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) =>
      store.footprints.transport.gentleMobilityFootprint +
      store.footprints.transport.holidaysTransportFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.other")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bike"
    >
      <OtherSectionContent />
    </ListAccordion>
  );
};
