import { Divider } from "react-native-paper";

import { ListAccordionGroup } from "@view/screens/profile/components/lists/ListAccordionGroup";
import { DrinksSection } from "@view/screens/profile/food/drinks/DrinksSection";
import { MealsSection } from "@view/screens/profile/food/meals/MealsSection";
import { WasteSection } from "@view/screens/profile/food/waste/WasteSection";

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
