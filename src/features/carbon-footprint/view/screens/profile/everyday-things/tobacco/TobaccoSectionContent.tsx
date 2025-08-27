import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useTobacco } from "@carbonFootprint/view/screens/profile/everyday-things/tobacco/useTobacco";

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
