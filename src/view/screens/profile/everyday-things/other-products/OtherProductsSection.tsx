import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { OtherProductsSectionContent } from "@view/screens/profile/everyday-things/other-products/OtherProductsSectionContent";

export const OtherProductsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.otherProductsFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.otherProducts")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="package"
    >
      <OtherProductsSectionContent />
    </ListAccordion>
  );
};
