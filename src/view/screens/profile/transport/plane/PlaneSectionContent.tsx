import { ValidateResponsesButton } from "@view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { usePlane } from "@view/screens/profile/transport/plane/usePlane";

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
        question={planeQuestions.hoursPerYearInShortHaul}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="h"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={planeQuestions.hoursPerYearInMediumHaul}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="h"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={planeQuestions.hoursPerYearInLongHaul}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="h"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ValidateResponsesButton category="transport" subCategory="plane" />
    </ListContentContainer>
  );
};
