import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useOther } from "./useOther";

export const OtherSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const { annualFootprint, control, updateTransportProfile, otherQuestions } =
    useOther();

  return (
    <ListAccordion
      title={t("emissions:transport.other")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bike"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={otherQuestions.gentleMobilityQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
        />
        <ListItemQuestion
          divider
          question={otherQuestions.holidaysTransportQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
        />
        <ListItemQuestion
          divider
          question={otherQuestions.kmPerYearByCamperVanQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="km"
          labelFlex={2}
          inputFlex={1}
          step={100}
        />
        <ListItemQuestion
          divider
          question={otherQuestions.kmPerYearByVanQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="km"
          labelFlex={2}
          inputFlex={1}
          step={100}
        />
        <ListItemQuestion
          divider
          question={otherQuestions.kmPerYearByCaravanQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="km"
          labelFlex={2}
          inputFlex={1}
          step={100}
        />
        <ListItemQuestion
          divider
          question={otherQuestions.camperVanFuelConsumptionQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="l/100km"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={otherQuestions.vanFuelConsumptionQuestion}
          control={control}
          handleUpdate={updateTransportProfile}
          affix="l/100km"
          labelFlex={1.5}
          inputFlex={1}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
