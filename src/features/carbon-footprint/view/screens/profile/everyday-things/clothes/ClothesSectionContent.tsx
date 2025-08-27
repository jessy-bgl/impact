import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useClothes } from "@carbonFootprint/view/screens/profile/everyday-things/clothes/useClothes";

export const ClothesSectionContent = () => {
  const { control, clothesQuestions, updateEverydayThingsProfile } =
    useClothes();

  return (
    <ListContentContainer>
      <ListItemQuestion
        forceDisplay
        question={clothesQuestions.newClothersPerYear}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ValidateResponsesButton
        category="everydayThings"
        subCategory="clothes"
      />
    </ListContentContainer>
  );
};
