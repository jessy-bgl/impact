import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { DrinksSectionContent } from "@view/screens/profile/food/drinks/DrinksSectionContent";

export const DrinksSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.drinksFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:food.drinks")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="water"
    >
      <DrinksSectionContent />
    </ListAccordion>
  );
};
