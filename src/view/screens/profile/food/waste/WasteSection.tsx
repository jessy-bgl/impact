import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useWaste } from "./useWaste";

export const WasteSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);

  const { control, annualFootprint, updateFoodProfile, wasteQuestions } =
    useWaste();

  return (
    <ListAccordion
      title={t("emissions:food.waste")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="recycle"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={wasteQuestions.wasteQuantityQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
        />
        <ListItemQuestion
          divider
          question={wasteQuestions.ecoGestureQuestion}
          control={control}
          handleUpdate={updateFoodProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
