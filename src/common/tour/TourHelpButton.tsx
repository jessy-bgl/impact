import { useTranslation } from "react-i18next";
import { IconButton, useTheme } from "react-native-paper";

type Props = {
  onPress: () => void;
};

/** The header button that replays a screen's guided tour. */
export const TourHelpButton = ({ onPress }: Props) => {
  const { t } = useTranslation("intro");

  const { colors } = useTheme();

  return (
    <IconButton
      icon="help-circle-outline"
      size={24}
      iconColor={colors.onSurfaceVariant}
      accessibilityLabel={t("tour.nav.help")}
      onPress={onPress}
    />
  );
};
