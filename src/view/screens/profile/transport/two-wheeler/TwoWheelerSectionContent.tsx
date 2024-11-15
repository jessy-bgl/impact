import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useTwoWheeler } from "@view/screens/profile/transport/two-wheeler/useTwoWheeler";

export const TwoWheelerSectionContent = () => {
  const { control, updateTransportProfile, twoWheelerQuestions } =
    useTwoWheeler();

  return (
    <ListContentContainer>
      <ListItemQuestion
        forceDisplay
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
        affix="km"
        labelFlex={1.5}
        inputFlex={1}
        step={100}
      />
    </ListContentContainer>
  );
};
