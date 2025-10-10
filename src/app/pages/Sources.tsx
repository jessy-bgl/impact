import { Image } from "expo-image";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { Card, Text, TouchableRipple } from "react-native-paper";

type DataSource = {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
};

export const Sources = () => {
  const { t } = useTranslation("menu");

  const dataSources: DataSource[] = [
    {
      id: "ademe",
      name: t("sources.ademe"),
      description: t("sources.ademeDescription"),
      url: "https://www.ademe.fr/",
      logo: require("@assets/images/ADEME.jpg"),
    },
    {
      id: "ngc",
      name: t("sources.ngc"),
      description: t("sources.ngcDescription"),
      url: "https://nosgestesclimat.fr/",
      logo: require("@assets/images/NGC.jpg"),
    },
    {
      id: "impact-co2",
      name: t("sources.impactCO2"),
      description: t("sources.impactCO2Description"),
      url: "https://impactco2.fr/",
      logo: require("@assets/images/Impact_CO2.png"),
    },
  ];

  const handleOpenUrl = useCallback(async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scrollContent}>
        {dataSources.map((source) => (
          <Card key={source.id} mode="elevated">
            <TouchableRipple onPress={() => handleOpenUrl(source.url)}>
              <View style={styles.cardContent}>
                <View style={styles.textContent}>
                  <Text variant="titleMedium" style={{ fontWeight: "600" }}>
                    {source.name}
                  </Text>
                  <Text variant="bodyMedium">{source.description}</Text>
                </View>
                <View style={styles.logoContainer}>
                  <Image
                    source={source.logo}
                    style={styles.logo}
                    contentFit="contain"
                  />
                </View>
              </View>
            </TouchableRipple>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    maxWidth: 500,
    alignSelf: "center",
  },
  cardContent: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 80,
  },
  textContent: {
    flex: 1,
    gap: 4,
  },
});
