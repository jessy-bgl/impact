import { useTranslation } from "react-i18next";

import { useAppStore } from "@carbonFootprint/data/store/store";
import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { DrinksSectionContent } from "@carbonFootprint/view/screens/profile/food/drinks/DrinksSectionContent";

export const DrinksSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.drinksFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.food.drinks,
  );

  return (
    <ListAccordion
      title={t("emissions:food.drinks")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="water"
      completed={isCompleted}
    >
      <DrinksSectionContent />
    </ListAccordion>
  );
};
