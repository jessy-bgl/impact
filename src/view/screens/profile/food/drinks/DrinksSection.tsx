import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useDrinks } from "./useDrinks";

export const DrinksSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);
  const { control, drinksQuestions, annualFootprint, updateFoodProfile } =
    useDrinks();

  return (
    <ListAccordion
      title={t("emissions:food.drinks")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="water"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={drinksQuestions.hotDrinksQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
        />
        <ListItemQuestion
          divider
          question={drinksQuestions.sodaConsumptionQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
          affix="litre(s)"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={drinksQuestions.alcoholConsumptionQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
          affix="litre(s)"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          forceDisplay
          question={drinksQuestions.bottleWaterConsumptionQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
