import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { MealsSectionContent } from "@carbonFootprint/view/screens/profile/food/meals/MealsSectionContent";
import { useAppStore } from "@common/store/useStore";

export const MealsSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.mealsFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.food.meals,
  );

  return (
    <ListAccordion
      title={t("emissions:food.meals")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="food"
      completed={isCompleted}
    >
      <MealsSectionContent />
    </ListAccordion>
  );
};
