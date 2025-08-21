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
import { useAppStore } from "@data/store/store";
import { appStoreActions } from "@data/store/storeActions";

export const IntroActions: React.FC = () => {
  const { t } = useTranslation(["intro", "actions", "common"]);

  const { navigate } = useNavigation<AppNavigationProp>();

  const { colors } = useTheme();

  const { setShouldShowActionsIntro } = appStoreActions;

  const profileCompletion = useAppStore((state) => state.profile.completion);

  const isProfileComplete = Object.values(profileCompletion).every((category) =>
    Object.values(category).every(Boolean),
  );

  const styles = StyleSheet.create({
    mainContainer: {
      padding: 16,
      gap: 24,
      maxWidth: 500,
      alignSelf: "center",
      width: "100%",
    },
    actionsListCardContent: {
      paddingVertical: 12,
    },
    actionsListCardTitle: {
      marginBottom: 6,
      fontWeight: "600",
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
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
      borderColor: colors.onBackground,
      borderWidth: 2,
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
    submitButtonText: { textAlign: "center", color: colors.onPrimary },
    image: {
      width: "100%",
      height: 200,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Text variant="titleLarge" style={{ textAlign: "center" }}>
        <Text>{t("intro:actions.find")}</Text>
        <Text style={{ color: colors.primary }}>
          {t("intro:actions.customizedActions")}
        </Text>
        <Text>{t("intro:actions.helping")}</Text>
        <Text style={{ color: colors.primary }}>
          {t("intro:actions.reduceYourImpact")} 🌱
        </Text>
      </Text>

      <View style={{ gap: 12 }}>
        <Image
          source={require("@assets/images/intro_actions.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.sampleActionLegendContainer}>
          <View style={styles.sampleActionLegendLabel}>
            <Text>1</Text>
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
            <Text>2</Text>
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
            <Text>3</Text>
          </View>
          <Text
            variant="bodyMedium"
            style={styles.sampleActionLegendDescription}
          >
            {t("intro:actions.buttons")}
          </Text>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text
          variant="bodyLarge"
          style={{ textAlign: "center", color: colors.onSurface }}
        >
          {t("intro:actions.navigationDescription")}
        </Text>
        <Card mode="contained">
          <Card.Content style={styles.actionsListCardContent}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <MaterialIcons
                name="apps"
                size={16}
                color={colors.secondary}
                style={{ marginTop: 3 }}
              />
              <Text
                variant="titleMedium"
                style={{
                  ...styles.actionsListCardTitle,
                  color: colors.secondary,
                }}
              >
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
        <Card mode="contained">
          <Card.Content style={styles.actionsListCardContent}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <MaterialIcons
                name="sync"
                size={16}
                color={colors.primary}
                style={{ marginTop: 3 }}
              />
              <Text
                variant="titleMedium"
                style={{
                  ...styles.actionsListCardTitle,
                  color: colors.primary,
                }}
              >
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
        <Card mode="contained">
          <Card.Content style={styles.actionsListCardContent}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <MaterialIcons
                name="remove-circle-outline"
                size={16}
                color={colors.error}
                style={{ marginTop: 3 }}
              />
              <Text
                variant="titleMedium"
                style={{ ...styles.actionsListCardTitle, color: colors.error }}
              >
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

      <View style={{ gap: 12 }}>
        {!isProfileComplete && (
          <Card mode="outlined">
            <Card.Content>
              <Text variant="bodyMedium" style={{ flexShrink: 1 }}>
                {t("intro:actions.beforeSubmitWarning")}
              </Text>
            </Card.Content>
          </Card>
        )}
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
        >
          {!isProfileComplete && (
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
                <Text numberOfLines={2} style={styles.submitButtonText}>
                  {t("intro:actions.completeProfile")}
                </Text>
              </TouchableRipple>
            </Surface>
          )}
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
              <Text numberOfLines={2} style={styles.submitButtonText}>
                {t("intro:actions.dismissActionsIntro")}
              </Text>
            </TouchableRipple>
          </Surface>
        </View>
      </View>
    </ScrollView>
  );
};
