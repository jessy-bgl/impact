import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { UsecasesContext } from "@common/context/UsecasesContext";

const PRIVACY_POLICY_URL =
  "https://github.com/jessy-bgl/impact/blob/main/docs/privacy-policy/privacy_policy.md";

export const ConsentScreen = () => {
  const { colors } = useTheme();

  const { t } = useTranslation("menu");

  const { grantAnalyticsConsent, revokeAnalyticsConsent } =
    useContext(UsecasesContext);

  const handleOpenPrivacyPolicy = useCallback(async () => {
    try {
      await Linking.openURL(PRIVACY_POLICY_URL);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          variant="titleLarge"
          style={{ color: colors.primary, textAlign: "center" }}
        >
          {t("consent.title")}
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
          {t("consent.explanation")}
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
          {t("consent.explanationDetail")}
        </Text>
        <Button mode="text" onPress={handleOpenPrivacyPolicy}>
          {t("consent.readMore")}
        </Button>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => revokeAnalyticsConsent()}
        >
          {t("consent.refuse")}
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => grantAnalyticsConsent()}
        >
          {t("consent.accept")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 16,
    maxWidth: 500,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  button: {
    flex: 1,
  },
});
