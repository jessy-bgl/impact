import { useTranslation } from "react-i18next";

import { useAppStore } from "@carbonFootprint/data/store/store";
import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { EnergySectionContent } from "@carbonFootprint/view/screens/profile/housing/energy/EnergySectionContent";

export const EnergySection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.housing.energyFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.housing.energy,
  );

  return (
    <ListAccordion
      title={t("emissions:housing.energy")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="flash"
      completed={isCompleted}
    >
      <EnergySectionContent />
    </ListAccordion>
  );
};
