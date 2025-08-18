import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ConsumableProductsSectionContent } from "@view/screens/profile/everyday-things/consumable-products/ConsumableProductsSectionContent";

export const ConsumableProductsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.consumableProductsFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.consumableProducts,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.consumableProducts")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="washing-machine"
      completed={isCompleted}
    >
      <ConsumableProductsSectionContent />
    </ListAccordion>
  );
};
