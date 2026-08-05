import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { usePublicTransport } from "@carbonFootprint/view/screens/profile/transport/public-transport/usePublicTransport";

export const PublicTransportSectionContent = () => {
  const { control, updateTransportProfile, publicTransportQuestions } =
    usePublicTransport();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={publicTransportQuestions.publicTransportUsage}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.trainKmPerYear}
        control={control}
        handleUpdate={updateTransportProfile}
        step={100}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.busHoursPerWeek}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.coachKmPerWeek}
        control={control}
        handleUpdate={updateTransportProfile}
        step={10}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.metroHoursPerWeek}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.boatHoursPerYear}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ValidateResponsesButton
        category="transport"
        subCategory="publicTransport"
      />
    </ListContentContainer>
  );
};
