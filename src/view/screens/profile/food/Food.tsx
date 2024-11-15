import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { DrinksSection } from "@view/screens/profile/food/drinks/DrinksSection";
import { MealsSection } from "@view/screens/profile/food/meals/MealsSection";
import { WasteSection } from "@view/screens/profile/food/waste/WasteSection";

export const FoodProfile = () => {
  return (
    <ScrollView>
      <List.AccordionGroup>
        <MealsSection />
        <Divider />
        <DrinksSection />
        <Divider />
        <WasteSection />
      </List.AccordionGroup>
    </ScrollView>
  );
};
