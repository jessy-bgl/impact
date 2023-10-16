import { Divider, List } from "react-native-paper";

import { CarSection } from "./car/CarSection";

export const TransportProfil = () => {
  return (
    <List.Section>
      <CarSection />
      <Divider />
    </List.Section>
  );
};
