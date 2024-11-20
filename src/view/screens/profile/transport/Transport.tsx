import { Divider } from "react-native-paper";

import { ListAccordionGroup } from "@view/screens/profile/components/lists/ListAccordionGroup";
import { BoatSection } from "@view/screens/profile/transport/boat/BoatSection";
import { CarSection } from "@view/screens/profile/transport/car/CarSection";
import { OtherSection } from "@view/screens/profile/transport/other/OtherSection";
import { PlaneSection } from "@view/screens/profile/transport/plane/PlaneSection";
import { PublicTransportSection } from "@view/screens/profile/transport/public-transport/PublicTransportSection";
import { TwoWheelerSection } from "@view/screens/profile/transport/two-wheeler/TwoWheelerSection";

export const TransportProfile = () => {
  return (
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
  );
};
