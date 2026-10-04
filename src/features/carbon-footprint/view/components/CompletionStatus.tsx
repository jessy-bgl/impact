import { useTranslation } from "react-i18next";
import { Text, useTheme } from "react-native-paper";

type Props = {
  isCompleted: boolean;
};

/** The one way a category tells whether its questionnaire is done. */
export const CompletionStatus = ({ isCompleted }: Props) => {
  const { t } = useTranslation("common");

  const { colors } = useTheme();

  return (
    // One line: Android rounds the measured width down at some densities and
    // would otherwise push the last word onto a clipped second line.
    <Text
      variant="labelMedium"
      numberOfLines={1}
      style={{ color: isCompleted ? colors.primary : colors.error }}
    >
      {isCompleted ? t("completed") : t("toComplete")}
    </Text>
  );
};
