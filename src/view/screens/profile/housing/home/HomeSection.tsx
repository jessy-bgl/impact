import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { HomeSectionContent } from "@view/screens/profile/housing/home/HomeSectionContent";

export const HomeSection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.housing.homeFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:housing.home")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="home"
    >
      <HomeSectionContent />
    </ListAccordion>
  );
};
