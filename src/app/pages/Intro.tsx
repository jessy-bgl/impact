import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { LightTheme } from "@app/AppTheme";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { getImageAsset } from "@common/utils/imageAssets";

const GRADIENT_COLORS = ["#FFFFFF", "#d8F9d9"] as const;

/**
 * The intro illustration is a GIF with a baked-in white background, so this
 * screen keeps the light palette even when the device is in dark mode.
 */
const colors = LightTheme.colors;

export const Intro = () => {
  const { t } = useTranslation("intro");

  const { setShouldShowAppIntro } = useContext(UsecasesContext);

  const deviceWidth = Dimensions.get("window").width;
  const imageSize = Math.min(deviceWidth / 1.7, 300);

  return (
    <LinearGradient colors={GRADIENT_COLORS} style={styles.linearGradient}>
      <ScrollView>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text
              variant="titleLarge"
              style={{ color: colors.primary, textAlign: "center" }}
            >
              {t("main.title")}
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: colors.onSurface,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {t("main.subtitle")}
            </Text>
            <Image
              source={getImageAsset("ecology")}
              style={{
                width: imageSize,
                height: imageSize,
                alignSelf: "center",
              }}
            />
            <Text variant="titleMedium" style={{ color: colors.onSurface }}>
              {`${t("main.With")} ${t("main.Impact")}, `}
              <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                {`${t("main.evaluate")} `}
              </Text>
              {`${t("main.your")} ${t("main.annualFootprint")}, `}
              <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                {`${t("main.identify")} `}
              </Text>
              {`${t("main.yours")} ${t("main.mainSourcesOfCarbonEmissions")} ${t("main.and")} `}
              <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                {`${t("main.reduce")} `}
              </Text>
              {`${t("main.their")} ${t("main.impact")} ${t("main.with")} ${t("main.concreteActions")}.`}
            </Text>
            <Text variant="titleMedium" style={{ color: colors.onSurface }}>
              {t("main.instructions")}
            </Text>
            <Text variant="titleSmall" style={{ color: colors.onSurface }}>
              {`*${t("main.simulatorInfo")}`}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              textColor={colors.onPrimary}
              onPress={() => setShouldShowAppIntro(false)}
            >
              {`${t("main.Understood")} !`}
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    gap: 30,
  },
  textContainer: {
    gap: 15,
    maxWidth: 500,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 200,
  },
});
