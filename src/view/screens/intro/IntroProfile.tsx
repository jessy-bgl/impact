import { appStoreActions } from "@data/store/storeActions";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text, useTheme } from "react-native-paper";

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

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
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
          source={require("@assets/images/intro_profile.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Card>
        <Card.Content style={{ gap: 4 }}>
          <View style={styles.textWithIconContainer}>
            <Icon source="information-outline" size={14} />
            <Text variant="bodyMedium">{t("profile.questionsInfoButton")}</Text>
          </View>
          <View style={styles.textWithIconContainer}>
            <Icon source="content-save" size={14} />
            <Text variant="bodyMedium">{t("profile.questionsAutoSave")}</Text>
          </View>
          <View style={styles.textWithIconContainer}>
            <Icon source="contrast-circle" size={14} />
            <Text variant="bodyMedium">
              {t("profile.questionsDefaultValues")}
            </Text>
          </View>
          <View style={styles.textWithIconContainer}>
            <Icon source="check-circle-outline" size={14} />
            <Text variant="bodyMedium">{t("profile.questionsCompletion")}</Text>
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
