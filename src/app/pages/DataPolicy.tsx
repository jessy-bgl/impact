import * as Clipboard from "expo-clipboard";
import { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  Icon,
  IconButton,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";

import { posthog } from "@common/config/posthog";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";
import { AnalyticsConsentChoices } from "@consent/view/components/AnalyticsConsentChoices";

const PRIVACY_POLICY_URL =
  "https://github.com/jessy-bgl/impact/blob/main/docs/privacy-policy/privacy_policy.md";

const truncateId = (id: string) => `${id.slice(0, 8)}…`;

type SectionCardProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

const SectionCard = ({ icon, title, children }: SectionCardProps) => {
  const { colors } = useTheme();

  return (
    <Card mode="elevated">
      <Card.Content style={styles.cardContent}>
        <View style={styles.sectionHeader}>
          <Icon source={icon} size={20} color={colors.primary} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            {title}
          </Text>
        </View>
        {children}
      </Card.Content>
    </Card>
  );
};

export const DataPolicy = () => {
  const { colors } = useTheme();

  const { t } = useTranslation("menu");

  const { clearLocalData } = useContext(UsecasesContext);

  const isAnalyticsConsentGranted = useAppStore(
    (state) => state.analyticsConsent.state === "granted",
  );

  const [isCopied, setIsCopied] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleOpenPrivacyPolicy = useCallback(async () => {
    try {
      await Linking.openURL(PRIVACY_POLICY_URL);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  }, []);

  const handleCopyId = useCallback(async () => {
    await Clipboard.setStringAsync(posthog.getDistinctId());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }, []);

  const handleConfirmClearLocalData = useCallback(() => {
    setIsClearDialogOpen(false);
    clearLocalData();
  }, [clearLocalData]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        maxWidth: 500,
        alignSelf: "center",
      }}
    >
      <SectionCard icon="security" title={t("dataPolicy.title")}>
        <Text variant="bodyMedium">{t("dataPolicy.description")}</Text>
        <Text
          variant="bodyMedium"
          onPress={handleOpenPrivacyPolicy}
          style={{ color: colors.primary, textDecorationLine: "underline" }}
        >
          {t("dataPolicy.privacyPolicy")}
        </Text>
      </SectionCard>

      <SectionCard icon="chart-bar" title={t("consent.toggleTitle")}>
        <Text variant="bodyMedium">
          {isAnalyticsConsentGranted
            ? t("consent.toggleDescriptionGranted")
            : t("consent.toggleDescriptionDenied")}
        </Text>
        <AnalyticsConsentChoices />
      </SectionCard>

      <SectionCard icon="identifier" title={t("consent.identifierTitle")}>
        <Text variant="bodyMedium">
          {isAnalyticsConsentGranted
            ? t("consent.identifierDescriptionGranted")
            : t("consent.identifierDescriptionDenied")}
        </Text>
        {isAnalyticsConsentGranted && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text variant="bodyMedium" style={{ fontFamily: "monospace" }}>
              {truncateId(posthog.getDistinctId())}
            </Text>
            <IconButton
              icon={isCopied ? "check" : "content-copy"}
              size={16}
              onPress={handleCopyId}
              accessibilityLabel={t("consent.copyIdentifier")}
            />
          </View>
        )}
      </SectionCard>

      <SectionCard
        icon="database-outline"
        title={t("dataPolicy.dataActionsTitle")}
      >
        <Text variant="bodyMedium">
          {t("dataPolicy.dataActionsDescription")}
        </Text>
        <Button
          mode="outlined"
          textColor={colors.error}
          icon="delete-outline"
          onPress={() => setIsClearDialogOpen(true)}
          style={{ alignSelf: "flex-start" }}
        >
          {t("dataPolicy.clearLocalData")}
        </Button>
      </SectionCard>

      <Portal>
        <Dialog
          visible={isClearDialogOpen}
          onDismiss={() => setIsClearDialogOpen(false)}
        >
          <Dialog.Title>{t("dataPolicy.clearLocalDataTitle")}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {t("dataPolicy.clearLocalDataConfirmation")}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsClearDialogOpen(false)}>
              {t("dataPolicy.clearLocalDataCancel")}
            </Button>
            <Button
              textColor={colors.error}
              onPress={handleConfirmClearLocalData}
            >
              {t("dataPolicy.clearLocalDataConfirm")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: "column",
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    fontWeight: "600",
  },
});
