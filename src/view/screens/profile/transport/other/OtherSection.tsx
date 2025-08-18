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

  const isCompleted = useAppStore(
    (state) => state.profile.completion.transport.otherTransport,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.other")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bike"
      completed={isCompleted}
    >
      <OtherSectionContent />
    </ListAccordion>
  );
};
