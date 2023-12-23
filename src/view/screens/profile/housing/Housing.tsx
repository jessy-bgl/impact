import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";
import { HomeSection } from "@view/screens/profile/housing/home/HomeSection";

export const HousingProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <HomeSection />
        <Divider />
      </List.Section>
    </ScrollView>
  );
};
