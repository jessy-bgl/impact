import { useTranslation } from "react-i18next";
import { Surface, Text, useTheme } from "react-native-paper";

export const EmissionsGoal = () => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  return (
    <Surface
      mode="flat"
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        borderColor: colors.primary,
        borderStyle: "solid",
        borderWidth: 1,
      }}
    >
      <Text>{t("2030goal")}</Text>
    </Surface>
  );
};
