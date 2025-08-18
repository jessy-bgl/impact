import { ValidateResponsesButton } from "@view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useTobacco } from "@view/screens/profile/everyday-things/tobacco/useTobacco";

export const TobaccoSectionContent = () => {
  const { control, updateEverydayThingsProfile, tobaccoQuestions } =
    useTobacco();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={tobaccoQuestions.tobaccoConsumption}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
        affix="paquet(s)"
        labelFlex={1}
        inputFlex={1}
      />
      <ValidateResponsesButton
        category="everydayThings"
        subCategory="tobacco"
      />
    </ListContentContainer>
  );
};
