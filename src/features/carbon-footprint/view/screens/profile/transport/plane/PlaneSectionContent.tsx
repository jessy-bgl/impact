import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { usePlane } from "@carbonFootprint/view/screens/profile/transport/plane/usePlane";

export const PlaneSectionContent = () => {
  const { control, updateTransportProfile, planeQuestions } = usePlane();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={planeQuestions.planeUsage}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={planeQuestions.annualFlights}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={planeQuestions.amortizedFlights}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ValidateResponsesButton category="transport" subCategory="plane" />
    </ListContentContainer>
  );
};
