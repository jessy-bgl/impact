import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { MealsSection } from "./meals/MealsSection";

export const FoodProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <MealsSection />
        <Divider />
      </List.Section>
    </ScrollView>
  );
};
