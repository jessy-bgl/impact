import { ValidateResponsesButton } from "@view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useDrinks } from "@view/screens/profile/food/drinks/useDrinks";

export const DrinksSectionContent = () => {
  const { control, drinksQuestions, updateFoodProfile } = useDrinks();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={drinksQuestions.hotDrinks}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ListItemQuestion
        divider
        question={drinksQuestions.sodaConsumption}
        control={control}
        handleUpdate={updateFoodProfile}
        affix="litre(s)"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={drinksQuestions.alcoholConsumption}
        control={control}
        handleUpdate={updateFoodProfile}
        affix="litre(s)"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        forceDisplay
        question={drinksQuestions.bottleWaterConsumption}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ValidateResponsesButton category="food" subCategory="drinks" />
    </ListContentContainer>
  );
};
