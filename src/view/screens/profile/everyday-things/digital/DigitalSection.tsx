import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { DigitalSectionContent } from "@view/screens/profile/everyday-things/digital/DigitalSectionContent";

export const DigitalSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.digitalFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.digital")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="devices"
    >
      <DigitalSectionContent />
    </ListAccordion>
  );
};
