import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { TwoWheelerSectionContent } from "@view/screens/profile/transport/two-wheeler/TwoWheelerSectionContent";

export const TwoWheelerSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.twoWheelerFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.twoWheeler")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="motorbike"
    >
      <TwoWheelerSectionContent />
    </ListAccordion>
  );
};
