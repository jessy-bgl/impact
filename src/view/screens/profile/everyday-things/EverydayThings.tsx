import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { ClothesSection } from "@view/screens/profile/everyday-things/clothes/ClothesSection";
import { ConsumableProductsSection } from "@view/screens/profile/everyday-things/consumable-products/ConsumableProductsSection";
import { DigitalSection } from "@view/screens/profile/everyday-things/digital/DigitalSection";
import { FurnitureSection } from "@view/screens/profile/everyday-things/furniture/FurnitureSection";
import { HobbiesSection } from "@view/screens/profile/everyday-things/hobbies/HobbiesSection";
import { HouseholdAppliancesSection } from "@view/screens/profile/everyday-things/household-appliances/HouseholdAppliancesSection";
import { OtherProductsSection } from "@view/screens/profile/everyday-things/other-products/OtherProductsSection";
import { PetsSection } from "@view/screens/profile/everyday-things/pets/PetsSection";
import { TobaccoSection } from "@view/screens/profile/everyday-things/tobacco/TobaccoSection";

export const EverydayThingsProfile = () => {
  return (
    <ScrollView>
      <List.AccordionGroup>
        <PetsSection />
        <Divider />
        <HobbiesSection />
        <Divider />
        <DigitalSection />
        <Divider />
        <ClothesSection />
        <Divider />
        <HouseholdAppliancesSection />
        <Divider />
        <FurnitureSection />
        <Divider />
        <ConsumableProductsSection />
        <Divider />
        <TobaccoSection />
        <Divider />
        <OtherProductsSection />
      </List.AccordionGroup>
    </ScrollView>
  );
};
