import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { MealsSectionContent } from "@view/screens/profile/food/meals/MealsSectionContent";

export const MealsSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.mealsFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:food.meals")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="food"
    >
      <MealsSectionContent />
    </ListAccordion>
  );
};
