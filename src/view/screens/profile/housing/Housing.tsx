import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { HomeSection } from "@view/screens/profile/housing/home/HomeSection";
import { EnergySection } from "@view/screens/profile/housing/energy/EnergySection";
import { LeisureSection } from "@view/screens/profile/housing/leisure/Leisure";

export const HousingProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <HomeSection />
        <Divider />
        <EnergySection />
        <Divider />
        <LeisureSection />
      </List.Section>
    </ScrollView>
  );
};
