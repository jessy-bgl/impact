import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { usePets } from "./usePets";

export const PetsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const {
    control,
    updateEverydayThingsProfile,
    annualFootprint,
    petsQuestions,
  } = usePets();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.pets")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="dog"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={petsQuestions.numberOfPetsQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
