import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { HouseholdAppliancesSectionContent } from "@view/screens/profile/everyday-things/household-appliances/HouseholdAppliancesSectionContent";

export const HouseholdAppliancesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.householdApplicancesFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.householdAppliances")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="microwave"
    >
      <HouseholdAppliancesSectionContent />
    </ListAccordion>
  );
};
