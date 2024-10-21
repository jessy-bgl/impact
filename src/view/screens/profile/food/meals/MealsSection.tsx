import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useMeals } from "./useMeals";

export const MealsSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);

  const { control, updateFoodProfile, annualFootprint, mealsQuestions } =
    useMeals();

  return (
    <ListAccordion
      title={t("emissions:food.meals")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="food"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={mealsQuestions.mealsQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
        />
        <ListItemQuestion
          divider
          question={mealsQuestions.localProductsQuestions}
          control={control}
          handleUpdate={updateFoodProfile}
        />
        <ListItemQuestion
          divider
          question={mealsQuestions.breakfastTypeQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
        />
        <ListItemQuestion
          divider
          question={mealsQuestions.milkTypeQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
        />
        <ListItemQuestion
          divider
          question={mealsQuestions.seasonalProductsQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
