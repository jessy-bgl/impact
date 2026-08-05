import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useTwoWheeler } from "@carbonFootprint/view/screens/profile/transport/two-wheeler/useTwoWheeler";

export const TwoWheelerSectionContent = () => {
  const { control, updateTransportProfile, twoWheelerQuestions } =
    useTwoWheeler();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={twoWheelerQuestions.twoWheelerUsage}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={twoWheelerQuestions.twoWheelerEngine}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={twoWheelerQuestions.kmPerYear}
        control={control}
        handleUpdate={updateTransportProfile}
        step={100}
      />
      <ValidateResponsesButton category="transport" subCategory="twoWheeler" />
    </ListContentContainer>
  );
};
