import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useOtherProducts } from "@carbonFootprint/view/screens/profile/everyday-things/other-products/useOtherProducts";

export const OtherProductsSectionContent = () => {
  const { control, updateEverydayThingsProfile, otherQuestions } =
    useOtherProducts();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={otherQuestions.expenses}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ListItemQuestion
        divider
        question={otherQuestions.relation}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ValidateResponsesButton
        category="everydayThings"
        subCategory="otherProducts"
      />
    </ListContentContainer>
  );
};
