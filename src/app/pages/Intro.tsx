import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { getImageAsset } from "@carbonFootprint/view/utils/imageAssets";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const Intro = () => {
  const { colors } = useTheme();

  const { t } = useTranslation("intro");

  const { setShouldShowAppIntro } = useContext(UsecasesContext);

  const deviceWidth = Dimensions.get("window").width;
  const imageSize = Math.min(deviceWidth / 1.7, 300);

  return (
    <LinearGradient
      colors={["#FFFFFF", "#d8F9d9"]}
      style={styles.linearGradient}
    >
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
                color: colors.inverseOnSurface,
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
            <Text
              variant="titleMedium"
              style={{ color: colors.inverseOnSurface }}
            >
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
            <Text
              variant="titleMedium"
              style={{ color: colors.inverseOnSurface }}
            >
              {t("main.instructions")}
            </Text>
            <Text
              variant="titleSmall"
              style={{ color: colors.inverseOnSurface }}
            >
              {`*${t("main.simulatorInfo")}`}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              textColor={"#fff"}
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
