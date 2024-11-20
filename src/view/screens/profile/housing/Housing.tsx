import { Divider } from "react-native-paper";

import { ListAccordionGroup } from "@view/screens/profile/components/lists/ListAccordionGroup";
import { EnergySection } from "@view/screens/profile/housing/energy/EnergySection";
import { HomeSection } from "@view/screens/profile/housing/home/HomeSection";
import { LeisureSection } from "@view/screens/profile/housing/leisure/LeisureSection";

export const HousingProfile = () => {
  return (
    <ListAccordionGroup>
      <HomeSection />
      <Divider />
      <EnergySection />
      <Divider />
      <LeisureSection />
    </ListAccordionGroup>
  );
};
