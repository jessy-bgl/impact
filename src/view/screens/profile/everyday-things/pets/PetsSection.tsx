import { useTranslation } from "react-i18next";

import { useAppStore } from "@data/store/store";
import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { PetsSectionContent } from "@view/screens/profile/everyday-things/pets/PetsSectionContent";

export const PetsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.petFootprint,
  );

  return (
    <ListAccordion
      title={t("emissions:everydayThings.pets")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="dog"
    >
      <PetsSectionContent />
    </ListAccordion>
  );
};
