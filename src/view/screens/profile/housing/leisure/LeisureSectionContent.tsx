import { ValidateResponsesButton } from "@view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useLeisure } from "@view/screens/profile/housing/leisure/useLeisure";

export const LeisureSectionContent = () => {
  const { control, updateHousingProfile, leisureQuestions } = useLeisure();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={leisureQuestions.swimmingPoolType}
        control={control}
        handleUpdate={updateHousingProfile}
      />
      <ListItemQuestion
        question={leisureQuestions.swimmingPoolSize}
        control={control}
        handleUpdate={updateHousingProfile}
        affix="m²"
        labelFlex={2}
        inputFlex={1}
      />
      <ListItemQuestion
        divider={leisureQuestions.swimmingPoolSize.isApplicable}
        question={leisureQuestions.outdoorEquipment}
        control={control}
        handleUpdate={updateHousingProfile}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.holidaysLodging}
        control={control}
        handleUpdate={updateHousingProfile}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.secondHomeSeasons}
        control={control}
        handleUpdate={updateHousingProfile}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.secondHomeLocation}
        control={control}
        handleUpdate={updateHousingProfile}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.secondHomeSurface}
        control={control}
        handleUpdate={updateHousingProfile}
        affix="m²"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.secondHomeTimeSpentPerYear}
        control={control}
        handleUpdate={updateHousingProfile}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.hotelNightsPerYear}
        control={control}
        handleUpdate={updateHousingProfile}
        labelFlex={2}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.campingNightPerYear}
        control={control}
        handleUpdate={updateHousingProfile}
        labelFlex={2}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.youthHostelNightsPerYear}
        control={control}
        handleUpdate={updateHousingProfile}
        labelFlex={2}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.rentalNightsPerYear}
        control={control}
        handleUpdate={updateHousingProfile}
        labelFlex={2}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={leisureQuestions.houseExchangeNightsPerYear}
        control={control}
        handleUpdate={updateHousingProfile}
        labelFlex={2}
        inputFlex={1}
      />
      <ValidateResponsesButton category="housing" subCategory="leisure" />
    </ListContentContainer>
  );
};
