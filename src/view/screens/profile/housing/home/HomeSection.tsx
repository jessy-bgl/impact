import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useHome } from "./useHome";

export const HomeSection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const { annualFootprint, control, updateHousingProfile, housingQuestions } =
    useHome();

  return (
    <ListAccordion
      title={t("emissions:housing.home")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="home"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={housingQuestions.homeTypeQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
        />
        <ListItemQuestion
          divider
          question={housingQuestions.numberOfInhabitantsQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          labelFlex={2.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={housingQuestions.homeAgeQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          affix="an(s)"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={housingQuestions.surfaceAreaQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
          affix="m²"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={housingQuestions.renovationWorkQuestion}
          control={control}
          handleUpdate={updateHousingProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
