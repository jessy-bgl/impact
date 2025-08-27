import { useTranslation } from "react-i18next";

import { useAppStore } from "@carbonFootprint/data/store/store";
import { ListAccordion } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordion";
import { PetsSectionContent } from "@carbonFootprint/view/screens/profile/everyday-things/pets/PetsSectionContent";

export const PetsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.petFootprint,
  );

  const isCompleted = useAppStore(
    (state) => state.profile.completion.everydayThings.pets,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.pets")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="dog"
      completed={isCompleted}
    >
      <PetsSectionContent />
    </ListAccordion>
  );
};
