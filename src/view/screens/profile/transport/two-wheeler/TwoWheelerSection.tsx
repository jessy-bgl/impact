import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useTwhoWheeler } from "./useTwoWheeler";

export const TwoWheelerSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const {
    annualFootprint,
    control,
    updateTransportProfile,
    twoWheelerQuestions,
  } = useTwhoWheeler();

  return (
    <ListAccordion
      title={t("emissions:transport.twoWheeler")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="motorbike"
    >
      <ListContentContainer>
        <ListItemQuestion
          forceDisplay
          question={twoWheelerQuestions.twoWheelerUsageQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
        />
        <ListItemQuestion
          divider
          question={twoWheelerQuestions.twoWheelerEngineQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
        />
        <ListItemQuestion
          divider
          question={twoWheelerQuestions.kmPerYearQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="km"
          labelFlex={1.5}
          inputFlex={1}
          step={100}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
