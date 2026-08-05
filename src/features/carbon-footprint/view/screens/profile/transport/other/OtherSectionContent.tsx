import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useOther } from "@carbonFootprint/view/screens/profile/transport/other/useOther";

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
        question={otherQuestions.gentleMobilityElectricBikeKmPerYear}
        control={control}
        handleUpdate={updateTransportProfile}
        step={100}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.gentleMobilitySmallVehicleKmPerYear}
        control={control}
        handleUpdate={updateTransportProfile}
        step={100}
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
        step={100}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.kmPerYearByVan}
        control={control}
        handleUpdate={updateTransportProfile}
        step={100}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.kmPerYearByCaravan}
        control={control}
        handleUpdate={updateTransportProfile}
        step={100}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.camperVanFuelConsumption}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.vanFuelConsumption}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ValidateResponsesButton
        category="transport"
        subCategory="otherTransport"
      />
    </ListContentContainer>
  );
};
