import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useConsumableProducts } from "./useConsumableProducts";

export const ConsumableProductsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const {
    control,
    updateEverydayThingsProfile,
    annualFootprint,
    consumableProductsQuestions,
  } = useConsumableProducts();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.consumableProducts")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="washing-machine"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={consumableProductsQuestions.consumableProductsQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
