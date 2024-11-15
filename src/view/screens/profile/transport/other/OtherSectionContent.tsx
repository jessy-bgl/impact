import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useOther } from "@view/screens/profile/transport/other/useOther";

export const OtherSectionContent = () => {
  const { control, updateTransportProfile, otherQuestions } = useOther();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={otherQuestions.gentleMobility}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.holidaysTransport}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.kmPerYearByCamperVan}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="km"
        labelFlex={2}
        inputFlex={1}
        step={100}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.kmPerYearByVan}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="km"
        labelFlex={2}
        inputFlex={1}
        step={100}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.kmPerYearByCaravan}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="km"
        labelFlex={2}
        inputFlex={1}
        step={100}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.camperVanFuelConsumption}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="l/100km"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.vanFuelConsumption}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="l/100km"
        labelFlex={1.5}
        inputFlex={1}
      />
    </ListContentContainer>
  );
};
