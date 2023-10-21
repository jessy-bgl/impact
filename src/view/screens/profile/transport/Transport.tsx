import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { BoatSection } from "./boat/BoatSection";
import { CarSection } from "./car/CarSection";
import { HolidaysSection } from "./holidays/HolidaysSection";
import { OtherSection } from "./other/OtherSection";
import { PlaneSection } from "./plane/PlaneSection";
import { TrainSection } from "./train/TrainSection";
import { TwoWheelerSection } from "./two-wheeler/TwoWheelerSection";

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
        <TrainSection />
        <Divider />
        <HolidaysSection />
        <Divider />
        <OtherSection />
      </List.Section>
    </ScrollView>
  );
};
