import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useBoat } from "./useBoat";

export const BoatSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const { control, boatQuestions, updateTransportProfile, annualFootprint } =
    useBoat();

  return (
    <ListAccordion
      title={t("emissions:transport.boat")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="ferry"
    >
      <ListContentContainer>
        <ListItemQuestion
          forceDisplay
          question={boatQuestions.boatUsageQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
        />
        <ListItemQuestion
          divider
          question={boatQuestions.boatHoursPerYearQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="h"
          labelFlex={2}
          inputFlex={1}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
