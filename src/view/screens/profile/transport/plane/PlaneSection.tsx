import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { usePlane } from "./usePlane";

export const PlaneSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const { annualFootprint, control, updateTransportProfile, planeQuestions } =
    usePlane();

  return (
    <ListAccordion
      title={t("emissions:transport.plane")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="airplane"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={planeQuestions.planeUsageQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
        />
        <ListItemQuestion
          divider
          question={planeQuestions.hoursPerYearInShortHaulQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="h"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={planeQuestions.hoursPerYearInMediumHaulQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="h"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={planeQuestions.hoursPerYearInLongHaulQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="h"
          labelFlex={1.5}
          inputFlex={1}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
