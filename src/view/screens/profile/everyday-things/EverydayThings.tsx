import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { ClothesSection } from "@view/screens/profile/everyday-things/clothes/ClothesSection";
import { PetsSection } from "@view/screens/profile/everyday-things/pets/PetsSections";
import { HouseholdAppliancesSection } from "@view/screens/profile/everyday-things/household-appliances/HouseholdAppliances";

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
      </List.Section>
    </ScrollView>
  );
};
