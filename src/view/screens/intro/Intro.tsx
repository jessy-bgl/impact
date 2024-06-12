import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { appStoreActions } from "@data/store/storeActions";

export const Intro = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("intro");
  const { setFirstLaunch } = appStoreActions;

  const deviceWidth = Dimensions.get("window").width;
  const imageSize = Math.min(deviceWidth / 1.7, 300);

  return (
    <LinearGradient
      colors={["#FFFFFF", "#d8F9d9"]}
      style={styles.linearGradient}
    >
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text
            variant="titleLarge"
            style={{ color: colors.primary, textAlign: "center" }}
          >
            {t("title")}
          </Text>
          <Text
            variant="titleMedium"
            style={{
              color: colors.inverseOnSurface,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {t("subtitle")}
          </Text>
          <Image
            style={{
              width: imageSize,
              height: imageSize,
              alignSelf: "center",
            }}
            source={require("@assets/images/ecology.gif")}
          />
          <Text
            variant="titleMedium"
            style={{ color: colors.inverseOnSurface }}
          >
            {`${t("With")} ${t("Impact")}, `}
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              {`${t("evaluate")} `}
            </Text>
            {`${t("your")} ${t("annualFootprint")}, `}
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              {`${t("identify")} `}
            </Text>
            {`${t("yours")} ${t("mainSourcesOfCarbonEmissions")} ${t("and")} `}
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              {`${t("reduce")} `}
            </Text>
            {`${t("their")} ${t("impact")} ${t("with")} ${t("concreteActions")}.`}
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: colors.inverseOnSurface }}
          >
            {t("instructions")}
          </Text>
          <Text variant="titleSmall" style={{ color: colors.inverseOnSurface }}>
            {`*${t("simulatorInfo")}`}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            textColor={colors.onPrimaryContainer}
            onPress={() => setFirstLaunch(false)}
          >
            {`${t("Understood")} !`}
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    gap: 20,
    marginTop: 20,
  },
  textContainer: {
    gap: 15,
    maxWidth: 500,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});
