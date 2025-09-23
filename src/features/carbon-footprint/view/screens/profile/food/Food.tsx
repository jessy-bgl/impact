import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { ListAccordionGroup } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordionGroup";
import { DrinksSection } from "@carbonFootprint/view/screens/profile/food/drinks/DrinksSection";
import { MealsSection } from "@carbonFootprint/view/screens/profile/food/meals/MealsSection";
import { WasteSection } from "@carbonFootprint/view/screens/profile/food/waste/WasteSection";

export const FoodProfile = () => {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <ListAccordionGroup>
        <MealsSection />
        <Divider />
        <DrinksSection />
        <Divider />
        <WasteSection />
      </ListAccordionGroup>
    </SafeAreaView>
  );
};
