import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useHouseholdAppliances } from "./useHouseholdAppliances";

export const HouseholdAppliancesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const {
    control,
    updateEverydayThingsProfile,
    annualFootprint,
    househouldAppliances,
  } = useHouseholdAppliances();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.householdAppliances")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="microwave"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={househouldAppliances.householdAppliancesQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
