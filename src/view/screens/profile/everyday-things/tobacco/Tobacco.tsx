import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useTobacco } from "./useTobacco";

export const TobaccoSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const {
    control,
    updateEverydayThingsProfile,
    annualFootprint,
    tobaccoQuestions,
  } = useTobacco();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.tobacco")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="smoking"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={tobaccoQuestions.tobaccoConsumptionQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
          affix="paquet(s)"
          labelFlex={1}
          inputFlex={1}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
