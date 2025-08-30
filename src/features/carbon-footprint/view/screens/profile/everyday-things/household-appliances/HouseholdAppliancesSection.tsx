import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { HouseholdAppliancesSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/household-appliances/HouseholdAppliancesSectionContent";
import { useAppStore } from "@common/store/useStore";

export const HouseholdAppliancesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.householdApplicancesFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.householdAppliances,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.householdAppliances")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="microwave"
      completed={isCompleted}
    >
      <HouseholdAppliancesSectionContent />
    </ListAccordion>
  );
};
