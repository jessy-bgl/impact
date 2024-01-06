import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { ClothesSection } from "@view/screens/profile/everyday-things/clothes/ClothesSection";
import { PetsSection } from "@view/screens/profile/everyday-things/pets/PetsSections";
import { HouseholdAppliancesSection } from "@view/screens/profile/everyday-things/household-appliances/HouseholdAppliances";
import { FurnitureSection } from "@view/screens/profile/everyday-things/furniture/Furniture";
import { DigitalSection } from "@view/screens/profile/everyday-things/digital/Digital";

export const EverydayThingsProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <ClothesSection />
        <Divider />
        <PetsSection />
        <Divider />
        <HouseholdAppliancesSection />
        <Divider />
        <FurnitureSection />
        <Divider />
        <DigitalSection />
        <Divider />
      </List.Section>
    </ScrollView>
  );
};
