import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { DigitalSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/digital/DigitalSectionContent";
import { useAppStore } from "@common/store/useStore";

export const DigitalSection = () => {
  const { t } = useTranslation(["emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.digitalFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.digital,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.digital")}
      footprint={annualFootprint}
      icon="devices"
      completed={isCompleted}
    >
      <DigitalSectionContent />
    </ListAccordion>
  );
};
