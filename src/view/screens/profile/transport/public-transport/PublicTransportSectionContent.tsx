import { ValidateResponsesButton } from "@view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { usePublicTransport } from "@view/screens/profile/transport/public-transport/usePublicTransport";

export const PublicTransportSectionContent = () => {
  const { control, updateTransportProfile, publicTransportQuestions } =
    usePublicTransport();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={publicTransportQuestions.trainKmPerYear}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="km"
        labelFlex={2}
        inputFlex={1}
        step={100}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.publicTransportUsage}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.busHoursPerWeek}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="h"
        labelFlex={2}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.coachKmPerWeek}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="km"
        labelFlex={2}
        inputFlex={1}
        step={10}
      />
      <ListItemQuestion
        divider
        question={publicTransportQuestions.metroHoursPerWeek}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="h"
        labelFlex={2}
        inputFlex={1}
      />
      <ValidateResponsesButton
        category="transport"
        subCategory="publicTransport"
      />
    </ListContentContainer>
  );
};
