import { ValidateResponsesButton } from "@view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { usePets } from "@view/screens/profile/everyday-things/pets/usePets";

export const PetsSectionContent = () => {
  const { control, updateEverydayThingsProfile, petsQuestions } = usePets();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={petsQuestions.numberOfPets}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ValidateResponsesButton category="everydayThings" subCategory="pets" />
    </ListContentContainer>
  );
};
