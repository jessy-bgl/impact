import { useTranslation } from "react-i18next";

import { useAppStore } from "@carbonFootprint/data/store/store";
import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { DigitalSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/digital/DigitalSectionContent";

export const DigitalSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.digitalFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.digital,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.digital")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="devices"
      completed={isCompleted}
    >
      <DigitalSectionContent />
    </ListAccordion>
  );
};
