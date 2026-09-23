import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";

import { useProfileTour } from "@carbonFootprint/view/tour/ProfileTourContext";

/** Header button replaying the profile tour. */
export const ProfileTourHelpButton = () => {
  const { t } = useTranslation("intro");

  const { startTour } = useProfileTour();

  return (
    <IconButton
      icon="help-circle"
      size={24}
      accessibilityLabel={t("tour.nav.help")}
      onPress={() => startTour("help_icon")}
    />
  );
};
