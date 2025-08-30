import { useTranslation } from "react-i18next";

import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { CarSectionContent } from "@carbonFootprint/view/screens/profile/transport/car/CarSectionContent";
import { useAppStore } from "@common/store/useStore";

export const CarSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.carFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.transport.car,
  );

  return (
    <ListAccordion
      title={t("emissions:transport.car")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="car"
      completed={isCompleted}
    >
      <CarSectionContent />
    </ListAccordion>
  );
};
