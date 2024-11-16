import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useFurniture } from "@view/screens/profile/everyday-things/furniture/useFurniture";

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
    </ListContentContainer>
  );
};
