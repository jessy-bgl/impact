import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useCar } from "@carbonFootprint/view/screens/profile/transport/car/useCar";

export const CarSectionContent = () => {
  const { control, updateTransportProfile, carQuestions } = useCar();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={carQuestions.kmPerYear}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="km"
        labelFlex={1.5}
        inputFlex={1}
        step={100}
      />
      <ListItemQuestion
        divider
        question={carQuestions.averagePassengers}
        control={control}
        handleUpdate={updateTransportProfile}
        labelFlex={3}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={carQuestions.regularUsageOfSameCar}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={carQuestions.carSize}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={carQuestions.carEngine}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={carQuestions.carFuelType}
        control={control}
        handleUpdate={updateTransportProfile}
      />
      <ListItemQuestion
        divider
        question={carQuestions.carFuelConsumption}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="l/100km"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ListItemQuestion
        divider
        question={carQuestions.carElectricityConsumption}
        control={control}
        handleUpdate={updateTransportProfile}
        affix="kWh/100km"
        labelFlex={1.5}
        inputFlex={1}
      />
      <ValidateResponsesButton category="transport" subCategory="car" />
    </ListContentContainer>
  );
};
