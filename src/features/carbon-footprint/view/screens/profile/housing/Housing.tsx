import { Divider } from "react-native-paper";

import { ListAccordionGroup } from "@carbonFootprint/view/screens/profile/components/lists/ListAccordionGroup";
import { EnergySection } from "@carbonFootprint/view/screens/profile/housing/energy/EnergySection";
import { HomeSection } from "@carbonFootprint/view/screens/profile/housing/home/HomeSection";
import { LeisureSection } from "@carbonFootprint/view/screens/profile/housing/leisure/LeisureSection";

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
