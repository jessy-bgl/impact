import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useFurniture } from "./useFurniture";

export const FurnitureSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const {
    control,
    updateEverydayThingsProfile,
    annualFootprint,
    furnitureQuestions,
  } = useFurniture();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.furniture")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bed"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={furnitureQuestions.furnitureQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
