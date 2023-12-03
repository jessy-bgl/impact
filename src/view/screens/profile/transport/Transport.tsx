import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { BoatSection } from "@view/screens/profile/transport/boat/BoatSection";
import { CarSection } from "@view/screens/profile/transport/car/CarSection";
import { OtherSection } from "@view/screens/profile/transport/other/OtherSection";
import { PlaneSection } from "@view/screens/profile/transport/plane/PlaneSection";
import { PublicTransportSection } from "@view/screens/profile/transport/public-transport/PublicTransportSection";
import { TwoWheelerSection } from "@view/screens/profile/transport/two-wheeler/TwoWheelerSection";

export const TransportProfile = () => {
  return (
    <ScrollView>
      <List.Section>
        <CarSection />
        <Divider />
        <TwoWheelerSection />
        <Divider />
        <PlaneSection />
        <Divider />
        <BoatSection />
        <Divider />
        <PublicTransportSection />
        <Divider />
        <OtherSection />
      </List.Section>
    </ScrollView>
  );
};
