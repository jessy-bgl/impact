import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useHobbies } from "./useHobbies";

export const HobbiesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const {
    control,
    hobbiesQuestions,
    annualFootprint,
    updateEverydayThingsProfile,
  } = useHobbies();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.hobbies")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bike"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={hobbiesQuestions.culturalHobbiesQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
        />
        <ListItemQuestion
          divider
          question={hobbiesQuestions.sportHobbiesQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
