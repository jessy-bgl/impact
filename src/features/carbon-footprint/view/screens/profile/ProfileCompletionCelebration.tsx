import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Icon,
  IconButton,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppTabParamList } from "@app/AppNavigator";
import { EmissionsNavigatorProp } from "@app/EmissionsNavigator";
import { useFootprints } from "@carbonFootprint/domain/hooks/useFootprints";
import { useFrenchAverageFootprint } from "@carbonFootprint/domain/hooks/useFrenchAverageFootprint";
import { FrenchAverageComparison } from "@carbonFootprint/view/screens/profile/FrenchAverageComparison";
import { posthog } from "@common/config/posthog";

const GRADIENT_COLORS: Record<"light" | "dark", [string, string]> = {
  light: ["#FFFFFF", "#d8F9d9"],
  dark: ["#121212", "#1B2E1B"],
};

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export const ProfileCompletionCelebration = ({ visible, onDismiss }: Props) => {
  const { t } = useTranslation("emissions");

  const { colors, dark } = useTheme();

  const navigation = useNavigation<EmissionsNavigatorProp>();

  const { annualFootprint } = useFootprints();

  const frenchAverageFootprint = useFrenchAverageFootprint();

  useEffect(() => {
    if (visible) posthog.capture("profile_completed");
  }, [visible]);

  const goToEmissions = () => {
    posthog.capture("profile_completed_cta_tapped", {
      destination: "emissions",
    });
    onDismiss();
    navigation.popToTop();
  };

  const goToActions = () => {
    posthog.capture("profile_completed_cta_tapped", { destination: "actions" });
    onDismiss();
    navigation.popToTop();
    navigation
      .getParent<BottomTabNavigationProp<AppTabParamList>>()
      ?.navigate("Actions");
  };

  const dismiss = () => {
    posthog.capture("profile_completed_dismissed");
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={dismiss}
        style={styles.modal}
        contentContainerStyle={styles.modalContent}
      >
        <LinearGradient
          colors={GRADIENT_COLORS[dark ? "dark" : "light"]}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <IconButton
              icon="close"
              accessibilityLabel={t("profileCompleted.close")}
              onPress={dismiss}
              style={styles.closeButton}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <MotiView
                from={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <Icon
                  source="check-decagram"
                  size={96}
                  color={colors.primary}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateY: 16 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 400, delay: 150 }}
                style={styles.textContainer}
              >
                <FrenchAverageComparison
                  myFootprint={annualFootprint}
                  averageFootprint={frenchAverageFootprint}
                />
                <Text
                  variant="bodyLarge"
                  style={{
                    ...styles.centeredText,
                    color: colors.onSurface,
                    marginTop: 16,
                  }}
                >
                  {t("profileCompleted.subtitle")}
                </Text>
                <Text
                  variant="bodyLarge"
                  style={{ ...styles.centeredText, color: colors.onSurface }}
                >
                  {t("profileCompleted.actionsEncouragement")}
                </Text>
              </MotiView>
            </ScrollView>
            <View style={styles.actionsContainer}>
              <Button
                mode="contained"
                icon="chart-donut"
                onPress={goToEmissions}
              >
                {t("profileCompleted.seeMyImpact")}
              </Button>
              <Button
                mode="text"
                icon="lightbulb-on-outline"
                onPress={goToActions}
              >
                {t("profileCompleted.discoverActions")}
              </Button>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: { margin: 0 },
  modalContent: { flex: 1 },
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  closeButton: { alignSelf: "flex-end" },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 20,
    gap: 24,
  },
  textContainer: {
    gap: 16,
    maxWidth: 500,
  },
  centeredText: { textAlign: "center" },
  actionsContainer: {
    gap: 8,
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
});
