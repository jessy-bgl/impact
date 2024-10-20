import { useTranslation } from "react-i18next";

import { ListAccordion } from "@view/screens/profile/components/lists/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useClothes } from "@view/screens/profile/everyday-things/clothes/useClothes";

export const ClothesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const {
    control,
    clothesQuestions,
    annualFootprint,
    updateEverydayThingsProfile,
  } = useClothes();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.clothes")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="tshirt-crew"
    >
      <ListContentContainer>
        <ListItemQuestion
          question={clothesQuestions.newClothersPerYearQuestion}
          control={control}
          handleUpdate={updateEverydayThingsProfile}
        />
      </ListContentContainer>
    </ListAccordion>
  );
};
