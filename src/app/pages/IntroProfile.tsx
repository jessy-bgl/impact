import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { appStoreActions } from "@carbonFootprint/data/store/storeActions";
import { getImageAsset } from "@carbonFootprint/view/utils/imageAssets";

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
    gap: 12,
  },
  image: {
    width: "100%",
    height: 500,
  },
  textWithIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
  },
});

export const IntroProfile = () => {
  const { colors } = useTheme();

  const { t } = useTranslation("intro");

  const { setShouldShowProfileIntro } = appStoreActions;

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      style={{ marginBottom: insets.bottom }}
    >
      <View>
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          <Text>{t("profile.find")}</Text>
          <Text style={{ color: colors.primary }}>
            {t("profile.questions")}
          </Text>
          <Text>{t("profile.toEstimate")}</Text>
          <Text style={{ color: colors.primary }}>
            {t("profile.carbonImpact")}
          </Text>
          <Text>{t("profile.byCategory")}</Text>
        </Text>
      </View>

      <View style={{ marginTop: 4 }}>
        <Text variant="bodyMedium">{t("profile.categoriesExplained")}</Text>
        <Text variant="bodyMedium" style={{ marginTop: 8 }}>
          {t("profile.categoryExample")}
        </Text>
      </View>

      <View>
        <Image
          source={getImageAsset("intro_profile")}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      <Card>
        <Card.Content style={{ gap: 4 }}>
          <View style={styles.textWithIconContainer}>
            <Icon source="information-outline" size={14} />
            <Text variant="bodyMedium" style={{ flexShrink: 1 }}>
              {t("profile.questionsInfoButton")}
            </Text>
          </View>
          <View style={styles.textWithIconContainer}>
            <Icon source="content-save" size={14} />
            <Text variant="bodyMedium" style={{ flexShrink: 1 }}>
              {t("profile.questionsAutoSave")}
            </Text>
          </View>
          <View style={styles.textWithIconContainer}>
            <Icon source="contrast-circle" size={14} />
            <Text variant="bodyMedium" style={{ flexShrink: 1 }}>
              {t("profile.questionsDefaultValues")}
            </Text>
          </View>
          <View style={styles.textWithIconContainer}>
            <Icon source="check-circle-outline" size={14} />
            <Text variant="bodyMedium" style={{ flexShrink: 1 }}>
              {t("profile.questionsCompletion")}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card mode="outlined" style={{ marginVertical: 12 }}>
        <Card.Content>
          <Text variant="bodyMedium">{t("profile.beforeSubmitWarning")}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => setShouldShowProfileIntro(false)}
        style={{ margin: "auto" }}
      >
        {t("profile.dismissProfileIntro")}
      </Button>
    </ScrollView>
  );
};
