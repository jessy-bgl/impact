import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useHome } from "@carbonFootprint/view/screens/profile/housing/home/useHome";

export const HomeSectionContent = () => {
  const { control, updateHousingProfile, housingQuestions } = useHome();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={housingQuestions.homeType}
        control={control}
        handleUpdate={updateHousingProfile}
      />
      <ListItemQuestion
        divider
        question={housingQuestions.numberOfInhabitants}
        control={control}
        handleUpdate={updateHousingProfile}
        labelFlex={2.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={housingQuestions.homeAge}
        control={control}
        handleUpdate={updateHousingProfile}
        affix="an(s)"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={housingQuestions.surfaceArea}
        control={control}
        handleUpdate={updateHousingProfile}
        affix="m²"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={housingQuestions.renovationWork}
        control={control}
        handleUpdate={updateHousingProfile}
      />
      <ValidateResponsesButton category="housing" subCategory="home" />
    </ListContentContainer>
  );
};
