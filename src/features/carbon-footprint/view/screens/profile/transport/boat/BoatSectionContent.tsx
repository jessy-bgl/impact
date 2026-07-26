import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useBoat } from "@carbonFootprint/view/screens/profile/transport/boat/useBoat";

export const BoatSectionContent = () => {
  const { control, boatQuestions, updateTransportProfile } = useBoat();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={boatQuestions.boatUsage}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={boatQuestions.boatHoursPerYear}
        control={control}
        handleUpdate={updateTransportProfile}
        labelFlex={2}
        inputFlex={1}
      />
      <ValidateResponsesButton category="transport" subCategory="boat" />
    </ListContentContainer>
  );
};
