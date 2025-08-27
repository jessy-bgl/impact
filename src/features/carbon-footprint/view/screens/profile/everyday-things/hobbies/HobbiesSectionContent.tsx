import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useHobbies } from "@carbonFootprint/view/screens/profile/everyday-things/hobbies/useHobbies";

export const HobbiesSectionContent = () => {
  const { control, hobbiesQuestions, updateEverydayThingsProfile } =
    useHobbies();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={hobbiesQuestions.culturalHobbies}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ListItemQuestion
        divider
        question={hobbiesQuestions.sportHobbies}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ValidateResponsesButton
        category="everydayThings"
        subCategory="hobbies"
      />
    </ListContentContainer>
  );
};
