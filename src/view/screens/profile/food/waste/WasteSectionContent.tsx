import { ValidateResponsesButton } from "@view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useWaste } from "@view/screens/profile/food/waste/useWaste";

export const WasteSectionContent = () => {
  const { control, updateFoodProfile, wasteQuestions } = useWaste();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={wasteQuestions.wasteQuantity}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ListItemQuestion
        divider
        question={wasteQuestions.ecoGesture}
        control={control}
        handleUpdate={updateFoodProfile}
      />
      <ValidateResponsesButton category="food" subCategory="waste" />
    </ListContentContainer>
  );
};
