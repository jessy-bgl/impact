import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useDigital } from "./useDigital";

export const DigitalSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const {
    control,
    digitalQuestions,
    annualFootprint,
    updateEverydayThingsProfile,
  } = useDigital();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.digital")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="devices"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={digitalQuestions.hoursPerDayOnInternetQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
          affix="h/jour"
          labelFlex={1.5}
          inputFlex={1}
        />
        <ListItemQuestion
          divider
          question={digitalQuestions.digitalDevicesQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
