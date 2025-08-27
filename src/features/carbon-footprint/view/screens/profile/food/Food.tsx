import { Divider } from "react-native-paper";

import { ListAccordionGroup } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordionGroup";
import { DrinksSection } from "@carbonFootprint/view/screens/profile/food/drinks/DrinksSection";
import { MealsSection } from "@carbonFootprint/view/screens/profile/food/meals/MealsSection";
import { WasteSection } from "@carbonFootprint/view/screens/profile/food/waste/WasteSection";

export const FoodProfile = () => {
  return (
    <ListAccordionGroup>
      <MealsSection />
      <Divider />
      <DrinksSection />
      <Divider />
      <WasteSection />
    </ListAccordionGroup>
  );
};
