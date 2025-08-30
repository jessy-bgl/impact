import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { OtherProductsSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/other-products/OtherProductsSectionContent";
import { useAppStore } from "@common/store/useStore";

export const OtherProductsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.otherProductsFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.otherProducts,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.otherProducts")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="package"
      completed={isCompleted}
    >
      <OtherProductsSectionContent />
    </ListAccordion>
  );
};
