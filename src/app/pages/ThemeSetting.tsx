import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { List, RadioButton, Text } from "react-native-paper";

import { UsecasesContext } from "@common/context/UsecasesContext";
import { ThemeMode } from "@common/store/store";
import { useAppStore } from "@common/store/useStore";

export const ThemeSetting = () => {
  const { t } = useTranslation(["pages", "menu"]);

  const theme = useAppStore((state) => state.theme);

  const { setTheme } = useContext(UsecasesContext);

  const themeOptions: { value: ThemeMode; label: string }[] = [
    { value: "auto", label: t("menu:theme.auto") },
    { value: "light", label: t("menu:theme.light") },
    { value: "dark", label: t("menu:theme.dark") },
  ];

  return (
    <ScrollView>
      <Text variant="titleMedium" style={{ padding: 16 }}>
        {t("menu:theme.description")}
      </Text>
      <RadioButton.Group
        onValueChange={(value) => setTheme(value as ThemeMode)}
        value={theme}
      >
        {themeOptions.map((option) => (
          <List.Item
            key={option.value}
            title={option.label}
            description={
              option.value === "auto"
                ? t("menu:theme.autoDescription")
                : undefined
            }
            onPress={() => setTheme(option.value)}
            style={{ paddingLeft: 16 }}
            left={() => (
              <RadioButton.Android
                value={option.value}
                status={theme === option.value ? "checked" : "unchecked"}
              />
            )}
          />
        ))}
      </RadioButton.Group>
    </ScrollView>
  );
};
