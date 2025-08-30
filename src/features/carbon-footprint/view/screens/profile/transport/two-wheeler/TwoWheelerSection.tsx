import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { TwoWheelerSectionContent } from "@carbonFootprint/view/screens/profile/transport/two-wheeler/TwoWheelerSectionContent";
import { useAppStore } from "@common/store/useStore";

export const TwoWheelerSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.twoWheelerFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.transport.twoWheeler,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.twoWheeler")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="motorbike"
      completed={isCompleted}
    >
      <TwoWheelerSectionContent />
    </ListAccordion>
  );
};
