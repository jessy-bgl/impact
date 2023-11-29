import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { DrinksSection } from "./drinks/DrinksSection";
import { MealsSection } from "./meals/MealsSection";

export const FoodProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <MealsSection />
        <Divider />
        <DrinksSection />
        <Divider />
      </List.Section>
    </ScrollView>
  );
};
