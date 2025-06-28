import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useClothes } from "@view/screens/profile/everyday-things/clothes/useClothes";

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
    </ListContentContainer>
  );
};
