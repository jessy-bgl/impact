import { useTheme } from "react-native-paper";

import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

const pieWidth = 250;
const pieHeight = 100;

type Props = {
  publicServices: FootprintCategoryViewModel;
  merchantServices: FootprintCategoryViewModel;
};

export const PublicServicesEmissionsDistributionForMobile = ({
  publicServices,
  merchantServices,
}: Props) => {
  const appTheme = useTheme();

  // TODO
  return <></>;
};
