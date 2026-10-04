import { useNavigation } from "@react-navigation/native";

import {
  EmissionsNavigatorProp,
  EmissionsStackParamList,
} from "@app/EmissionsNavigator";
import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { posthog } from "@common/config/posthog";

const categoryProfileScreens: Record<
  FootprintCategory,
  keyof EmissionsStackParamList
> = {
  transport: "TransportProfile",
  housing: "HousingProfile",
  food: "FoodProfile",
  everydayThings: "EverydayThingsProfile",
  societalServices: "SocietalServicesProfile",
};

/** Opens the questionnaire of a category, wherever the user picked it from. */
export const useOpenCategoryProfile = () => {
  const { navigate } = useNavigation<EmissionsNavigatorProp>();

  return (category: FootprintCategory) => {
    posthog.capture("profile_category_opened", { category });
    navigate(categoryProfileScreens[category]);
  };
};
