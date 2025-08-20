import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  Card,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

import { AppNavigationProp } from "@common/AppNavigation";
import { appStoreActions } from "@data/store/storeActions";

export const IntroActions: React.FC = () => {
  const { t } = useTranslation(["intro", "actions", "common"]);

  const { colors } = useTheme();

  const { setShouldShowActionsIntro } = appStoreActions;

  const { navigate } = useNavigation<AppNavigationProp>();

  const styles = StyleSheet.create({
    actionsListCard: {
      backgroundColor: colors.surfaceVariant,
    },
    actionsListCardContent: {
      paddingVertical: 12,
    },
    actionsListCardTitle: {
      marginBottom: 6,
      fontWeight: "600",
      color: colors.primary,
    },
    actionsListCardDescription: {
      color: colors.onSurfaceVariant,
    },
    sampleActionLegendContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    sampleActionLegendLabel: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
      borderColor: colors.primary,
      borderWidth: 2,
    },
    sampleActionLegendLabelText: {
      color: colors.primary,
    },
    sampleActionLegendDescription: {
      color: colors.onSurface,
      flex: 1,
    },
    submitButtonSurface: {
      flex: 1,
      borderRadius: 8,
      height: 42,
    },
    submitButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
    },
  });

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 24,
        maxWidth: 600,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <Text variant="titleLarge" style={{ textAlign: "center" }}>
        <Text>{t("intro:actions.find")}</Text>
        <Text style={{ color: colors.primary }}>
          {t("intro:actions.customizedActions")}
        </Text>
        <Text>{t("intro:actions.helping")}</Text>
        <Text style={{ color: colors.primary }}>
          {t("intro:actions.reduceYourImpact")}
        </Text>
      </Text>

      <View style={{ gap: 12 }}>
        <Image
          source={require("@assets/images/intro_actions.png")}
          style={{
            width: "100%",
            height: 200,
            marginBottom: 6,
          }}
          resizeMode="contain"
        />

        <View style={styles.sampleActionLegendContainer}>
          <View style={styles.sampleActionLegendLabel}>
            <Text
              variant="labelLarge"
              style={styles.sampleActionLegendLabelText}
            >
              1
            </Text>
          </View>
          <Text
            variant="bodyMedium"
            style={styles.sampleActionLegendDescription}
          >
            {t("intro:actions.carbonSavings")}
          </Text>
        </View>

        <View style={styles.sampleActionLegendContainer}>
          <View style={styles.sampleActionLegendLabel}>
            <Text
              variant="labelLarge"
              style={styles.sampleActionLegendLabelText}
            >
              2
            </Text>
          </View>
          <Text
            variant="bodyMedium"
            style={styles.sampleActionLegendDescription}
          >
            {t("intro:actions.category")}
          </Text>
        </View>

        <View style={styles.sampleActionLegendContainer}>
          <View style={styles.sampleActionLegendLabel}>
            <Text
              variant="labelLarge"
              style={styles.sampleActionLegendLabelText}
            >
              3
            </Text>
          </View>
          <Text
            variant="bodyMedium"
            style={styles.sampleActionLegendDescription}
          >
            {t("intro:actions.buttons")}
          </Text>
        </View>
      </View>

      <Text
        variant="bodyLarge"
        style={{ textAlign: "center", color: colors.onSurface }}
      >
        {t("intro:actions.navigationDescription")}
      </Text>

      <View style={{ gap: 12 }}>
        <Card style={styles.actionsListCard}>
          <Card.Content style={styles.actionsListCardContent}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <MaterialIcons
                name="apps"
                size={16}
                color={colors.onSurfaceVariant}
                style={{ marginTop: 3 }}
              />
              <Text variant="titleMedium" style={styles.actionsListCardTitle}>
                {t("actions:actionsList")}
              </Text>
            </View>
            <Text
              variant="bodyMedium"
              style={styles.actionsListCardDescription}
            >
              {t("intro:actions.availableTab")}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.actionsListCard}>
          <Card.Content style={styles.actionsListCardContent}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <MaterialIcons
                name="sync"
                size={16}
                color={colors.onSurfaceVariant}
                style={{ marginTop: 3 }}
              />
              <Text variant="titleMedium" style={styles.actionsListCardTitle}>
                {t("actions:actionsInProgress")}
              </Text>
            </View>
            <Text
              variant="bodyMedium"
              style={styles.actionsListCardDescription}
            >
              {t("intro:actions.inProgressTab")}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.actionsListCard}>
          <Card.Content style={styles.actionsListCardContent}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <MaterialIcons
                name="remove-circle-outline"
                size={16}
                color={colors.onSurfaceVariant}
                style={{ marginTop: 3 }}
              />
              <Text variant="titleMedium" style={styles.actionsListCardTitle}>
                {t("actions:actionsSkipped")}
              </Text>
            </View>
            <Text
              variant="bodyMedium"
              style={styles.actionsListCardDescription}
            >
              {t("intro:actions.dismissedTab")}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={{ marginTop: 12, gap: 12 }}>
        <Card
          style={{
            borderWidth: 1,
            borderColor: colors.surfaceVariant,
            padding: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialIcons name="info" size={24} color={colors.secondary} />
            <Text style={{ flexShrink: 1 }}>
              {t("intro:actions.beforeSubmitWarning")}
            </Text>
          </View>
        </Card>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
        >
          <Surface
            style={{
              ...styles.submitButtonSurface,
              backgroundColor: colors.secondary,
            }}
          >
            <TouchableRipple
              onPress={() => navigate("Profile")}
              style={styles.submitButton}
            >
              <Text numberOfLines={2} style={{ textAlign: "center" }}>
                {t("intro:actions.completeProfile")}
              </Text>
            </TouchableRipple>
          </Surface>
          <Surface
            style={{
              ...styles.submitButtonSurface,
              backgroundColor: colors.primary,
            }}
          >
            <TouchableRipple
              onPress={() => setShouldShowActionsIntro(false)}
              style={styles.submitButton}
            >
              <Text numberOfLines={2} style={{ textAlign: "center" }}>
                {t("intro:actions.dismissActionsIntro")}
              </Text>
            </TouchableRipple>
          </Surface>
        </View>
      </View>
    </ScrollView>
  );
};
