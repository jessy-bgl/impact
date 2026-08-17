import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { OtherProductsSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/other-products/OtherProductsSectionContent";
import { useAppStore } from "@common/store/useStore";

/**
 * Read-only counterpart of the editable sections: it displays the part of the
 * everyday things footprint that no question can change, so that the rows of the
 * screen add up to the category total shown on the profile home.
 */
export const OtherProductsSection = () => {
  const { t } = useTranslation(["emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.otherProductsFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.other")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="dots-horizontal-circle"
      completed
    >
      <OtherProductsSectionContent />
    </ListAccordion>
  );
};
