import { ClothesSection } from "@view/screens/profile/everyday-things/clothes/ClothesSection";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

export const EverydayThingsProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <ClothesSection />
      </List.Section>
    </ScrollView>
  );
};
