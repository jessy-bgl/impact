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
        question={clothesQuestions.clothes}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ListItemQuestion
        divider
        question={clothesQuestions.clothesQuantity}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ListItemQuestion
        divider
        question={clothesQuestions.clothesQuality}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ListItemQuestion
        divider
        question={clothesQuestions.clothesResell}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ListItemQuestion
        divider
        question={clothesQuestions.clothesRenewReason}
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
