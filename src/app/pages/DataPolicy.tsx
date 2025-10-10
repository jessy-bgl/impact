import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, View } from "react-native";
import { Button, Card, Icon, Text, useTheme } from "react-native-paper";

export const DataPolicy = () => {
  const { colors } = useTheme();

  const { t } = useTranslation("menu");

  const handleOpenUrl = useCallback(async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        maxWidth: 500,
        alignSelf: "center",
      }}
    >
      <Card mode="outlined">
        <Card.Content style={{ flexDirection: "column", gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Icon source="security" size={20} color={colors.primary} />
            <Text
              variant="titleMedium"
              style={{ color: colors.primary, fontWeight: "600" }}
            >
              {t("dataPolicy.title")}
            </Text>
          </View>
          <Text variant="bodyMedium">{t("dataPolicy.description")}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="text"
            onPress={() =>
              handleOpenUrl(
                "https://github.com/jessy-bgl/impact/blob/main/docs/privacy-policy/privacy_policy.md",
              )
            }
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Icon source="file-document" size={20} />
              <Text variant="bodyMedium">{t("dataPolicy.privacyPolicy")}</Text>
            </View>
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};
