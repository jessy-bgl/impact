import { useProfileTour } from "@carbonFootprint/view/tour/ProfileTourContext";
import { TourHelpButton } from "@common/tour/TourHelpButton";

/** Header button replaying the profile tour. */
export const ProfileTourHelpButton = () => {
  const { startTour } = useProfileTour();

  return <TourHelpButton onPress={() => startTour("help_icon")} />;
};
