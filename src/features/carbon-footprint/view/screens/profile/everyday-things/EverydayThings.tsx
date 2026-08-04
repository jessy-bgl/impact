import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { ListAccordionGroup } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordionGroup";
import { ClothesSection } from "@carbonFootprint/view/screens/profile/everyday-things/clothes/ClothesSection";
import { DigitalSection } from "@carbonFootprint/view/screens/profile/everyday-things/digital/DigitalSection";
import { FurnitureSection } from "@carbonFootprint/view/screens/profile/everyday-things/furniture/FurnitureSection";
import { HobbiesSection } from "@carbonFootprint/view/screens/profile/everyday-things/hobbies/HobbiesSection";
import { HouseholdAppliancesSection } from "@carbonFootprint/view/screens/profile/everyday-things/household-appliances/HouseholdAppliancesSection";
import { PetsSection } from "@carbonFootprint/view/screens/profile/everyday-things/pets/PetsSection";
import { TobaccoSection } from "@carbonFootprint/view/screens/profile/everyday-things/tobacco/TobaccoSection";

export const EverydayThingsProfile = () => {
  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
      <ListAccordionGroup>
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
        <TobaccoSection />
      </ListAccordionGroup>
    </SafeAreaView>
  );
};
