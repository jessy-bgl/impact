import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { usePublicTransport } from "./usePublicTransport";

export const PublicTransportSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const {
    control,
    updateTransportProfile,
    annualFootprint,
    publicTransportQuestions,
  } = usePublicTransport();

  return (
    <ListAccordion
      title={t("emissions:transport.public")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="train"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={publicTransportQuestions.trainKmPerYearQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="km"
          labelFlex={2}
          inputFlex={1}
          step={100}
        />
        <ListItemQuestion
          divider
          question={publicTransportQuestions.publicTransportUsageQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
        />
        <ListItemQuestion
          divider
          question={publicTransportQuestions.hoursPerWeekInBusQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="h"
          labelFlex={2}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={publicTransportQuestions.coachKmPerWeekQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="km"
          labelFlex={2}
          inputFlex={1}
          step={10}
        />
        <ListItemQuestion
          divider
          question={publicTransportQuestions.hoursPerWeekInMetroQuestion}
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
