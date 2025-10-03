import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { PublicTransportSectionContent } from "@carbonFootprint/view/screens/profile/transport/public-transport/PublicTransportSectionContent";
import { useAppStore } from "@common/store/useStore";

export const PublicTransportSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) =>
      store.footprints.transport.publicTransportFootprint +
      store.footprints.transport.trainFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.transport.publicTransport,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.public")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="train"
      completed={isCompleted}
    >
      <PublicTransportSectionContent />
    </ListAccordion>
  );
};
