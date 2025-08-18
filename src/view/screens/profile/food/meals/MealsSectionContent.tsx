import { ValidateResponsesButton } from "@view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useMeals } from "@view/screens/profile/food/meals/useMeals";

export const MealsSectionContent = () => {
  const { control, updateFoodProfile, mealsQuestions } = useMeals();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={mealsQuestions.meals}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ListItemQuestion
        divider
        question={mealsQuestions.localProducts}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ListItemQuestion
        divider
        question={mealsQuestions.breakfastType}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ListItemQuestion
        divider
        question={mealsQuestions.milkType}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ListItemQuestion
        divider
        question={mealsQuestions.seasonalProducts}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ValidateResponsesButton category="food" subCategory="meals" />
    </ListContentContainer>
  );
};
