import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { EnergySection } from "@view/screens/profile/housing/energy/EnergySection";
import { HomeSection } from "@view/screens/profile/housing/home/HomeSection";
import { LeisureSection } from "@view/screens/profile/housing/leisure/LeisureSection";

export const HousingProfile = () => {
  return (
    <ScrollView>
      <List.AccordionGroup>
        <HomeSection />
        <Divider />
        <EnergySection />
        <Divider />
        <LeisureSection />
      </List.AccordionGroup>
    </ScrollView>
  );
};
