import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { ListAccordionGroup } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordionGroup";
import { BoatSection } from "@carbonFootprint/view/screens/profile/transport/boat/BoatSection";
import { CarSection } from "@carbonFootprint/view/screens/profile/transport/car/CarSection";
import { OtherSection } from "@carbonFootprint/view/screens/profile/transport/other/OtherSection";
import { PlaneSection } from "@carbonFootprint/view/screens/profile/transport/plane/PlaneSection";
import { PublicTransportSection } from "@carbonFootprint/view/screens/profile/transport/public-transport/PublicTransportSection";
import { TwoWheelerSection } from "@carbonFootprint/view/screens/profile/transport/two-wheeler/TwoWheelerSection";

export const TransportProfile = () => {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <ListAccordionGroup>
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
      </ListAccordionGroup>
    </SafeAreaView>
  );
};
