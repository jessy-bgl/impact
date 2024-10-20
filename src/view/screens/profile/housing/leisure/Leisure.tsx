import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useLeisure } from "@view/screens/profile/housing/leisure/useLeisure";

export const LeisureSection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const { annualFootprint, control, updateHousingProfile, leisureQuestions } =
    useLeisure();

  return (
    <ListAccordion
      title={t("emissions:housing.leisure")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="beach"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={leisureQuestions.swimmingPoolTypeQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
        />
        <ListItemQuestion
          question={leisureQuestions.swimmingPoolSizeQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          affix="m²"
          labelFlex={2}
          inputFlex={1}
        />
        <ListItemQuestion
          divider={leisureQuestions.swimmingPoolSizeQuestion.isApplicable}
          question={leisureQuestions.outdoorEquipmentQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.holidaysLodgingQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.secondHomeSeasonsQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.secondHomeLocationQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.secondHomeSurfaceQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          affix="m²"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.secondHomeTimeSpentPerYearQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.hotelNightsPerYearQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          labelFlex={2}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.campingNightPerYearQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          labelFlex={2}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.youthHostelNightsPerYearQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          labelFlex={2}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.rentalNightsPerYearQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          labelFlex={2}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={leisureQuestions.houseExchangeNightsPerYearQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          labelFlex={2}
          inputFlex={1}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
