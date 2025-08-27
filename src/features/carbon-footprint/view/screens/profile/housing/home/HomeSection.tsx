import { useTranslation } from "react-i18next";

import { useAppStore } from "@carbonFootprint/data/store/store";
import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { HomeSectionContent } from "@carbonFootprint/view/screens/profile/housing/home/HomeSectionContent";

export const HomeSection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.housing.homeFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.housing.home,
  );

  return (
    <ListAccordion
      title={t("emissions:housing.home")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="home"
      completed={isCompleted}
    >
      <HomeSectionContent />
    </ListAccordion>
  );
};
