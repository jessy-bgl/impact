import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { DrinksSection } from "./drinks/DrinksSection";
import { MealsSection } from "./meals/MealsSection";
import { WasteSection } from "./waste/WasteSection";

export const FoodProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <MealsSection />
        <Divider />
        <DrinksSection />
        <Divider />
        <WasteSection />
      </List.Section>
    </ScrollView>
  );
};
