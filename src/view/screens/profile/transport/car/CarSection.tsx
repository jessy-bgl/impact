import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useCar } from "./useCar";

export const CarSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const { annualFootprint, control, updateTransportProfile, carQuestions } =
    useCar();

  return (
    <>
      <ListAccordion
        title={t("emissions:transport.car")}
        subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        icon="car"
      >
        <ListContentContainer>
          <ListItemQuestion
            question={carQuestions.kmPerYearQuestion}
            control={control}
            handleUpdate={updateTransportProfile}
            affix="km"
            labelFlex={1.5}
            inputFlex={1}
            step={100}
          />
          <ListItemQuestion
            divider
            question={carQuestions.averagePassengersQuestion}
            control={control}
            handleUpdate={updateTransportProfile}
            labelFlex={3}
            inputFlex={1}
          />
          <ListItemQuestion
            divider
            question={carQuestions.regularUsageOfSameCarQuestion}
            control={control}
            handleUpdate={updateTransportProfile}
          />
          <ListItemQuestion
            divider
            question={carQuestions.carSizeQuestion}
            control={control}
            handleUpdate={updateTransportProfile}
          />
          <ListItemQuestion
            divider
            question={carQuestions.carEngineQuestion}
            control={control}
            handleUpdate={updateTransportProfile}
          />
          <ListItemQuestion
            divider
            question={carQuestions.carFuelTypeQuestion}
            control={control}
            handleUpdate={updateTransportProfile}
          />
          <ListItemQuestion
            divider
            question={carQuestions.carFuelConsumptionQuestion}
            control={control}
            handleUpdate={updateTransportProfile}
            affix="l/100km"
            labelFlex={1.5}
            inputFlex={1}
          />
          <ListItemQuestion
            divider
            question={carQuestions.carElectricityConsumptionQuestion}
            control={control}
            handleUpdate={updateTransportProfile}
            affix="kWh/100km"
            labelFlex={1.5}
            inputFlex={1}
          />
        </ListContentContainer>
      </ListAccordion>
    </>
  );
};
