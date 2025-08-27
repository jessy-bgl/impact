import { ValidateResponsesButton } from "@carbonFootprint/view/screens/profile/components/forms/ValidateResponsesButton";
import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestion";
import { useConsumableProducts } from "@carbonFootprint/view/screens/profile/everyday-things/consumable-products/useConsumableProducts";

export const ConsumableProductsSectionContent = () => {
  const { control, updateEverydayThingsProfile, consumableProductsQuestions } =
    useConsumableProducts();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={consumableProductsQuestions.consumableProducts}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
      <ValidateResponsesButton
        category="everydayThings"
        subCategory="consumableProducts"
      />
    </ListContentContainer>
  );
};
