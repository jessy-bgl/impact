import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useConsumableProducts } from "@view/screens/profile/everyday-things/consumable-products/useConsumableProducts";

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
    </ListContentContainer>
  );
};
