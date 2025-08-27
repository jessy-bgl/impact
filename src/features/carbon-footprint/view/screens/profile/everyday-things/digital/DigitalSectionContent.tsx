import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useDigital } from "@carbonFootprint/view/screens/profile/everyday-things/digital/useDigital";

export const DigitalSectionContent = () => {
  const { control, digitalQuestions, updateEverydayThingsProfile } =
    useDigital();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={digitalQuestions.hoursPerDayOnInternet}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
        affix="h/jour"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={digitalQuestions.digitalDevices}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ValidateResponsesButton
        category="everydayThings"
        subCategory="digital"
      />
    </ListContentContainer>
  );
};
