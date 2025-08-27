import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useFurniture } from "@carbonFootprint/view/screens/profile/everyday-things/furniture/useFurniture";

export const FurnitureSectionContent = () => {
  const { control, updateEverydayThingsProfile, furnitureQuestions } =
    useFurniture();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={furnitureQuestions.furniture}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ValidateResponsesButton
        category="everydayThings"
        subCategory="furniture"
      />
    </ListContentContainer>
  );
};
