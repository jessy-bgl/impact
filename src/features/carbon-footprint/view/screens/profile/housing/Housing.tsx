import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { ListAccordionGroup } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordionGroup";
import { EnergySection } from "@carbonFootprint/view/screens/profile/housing/energy/EnergySection";
import { HomeSection } from "@carbonFootprint/view/screens/profile/housing/home/HomeSection";
import { LeisureSection } from "@carbonFootprint/view/screens/profile/housing/leisure/LeisureSection";

export const HousingProfile = () => {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <ListAccordionGroup>
        <HomeSection />
        <Divider />
        <EnergySection />
        <Divider />
        <LeisureSection />
      </ListAccordionGroup>
    </SafeAreaView>
  );
};
