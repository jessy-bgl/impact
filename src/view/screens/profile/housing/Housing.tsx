import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";
import { HomeSection } from "@view/screens/profile/housing/home/HomeSection";
import { EnergySection } from "@view/screens/profile/housing/energy/EnergySection";

export const HousingProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <HomeSection />
        <Divider />
        <EnergySection />
      </List.Section>
    </ScrollView>
  );
};
