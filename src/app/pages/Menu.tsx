import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Linking, Platform, ScrollView, StyleSheet } from "react-native";
import { Divider, List } from "react-native-paper";

import { MenuNavigationProp } from "@app/MenuNavigator";

const INSTAGRAM_URL =
  "https://www.instagram.com/impact_app_?igsh=MWp0aWE2MW43enFodg==";
const GITHUB_URL = "https://github.com/jessy-bgl/impact";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.impactech.impact&pcampaignid=web_share";

export const Menu = () => {
  const { t } = useTranslation(["pages", "menu"]);

  const navigation = useNavigation<MenuNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <List.Section>
        <List.Subheader>{t("Preferences")}</List.Subheader>
        <List.Item
          title={t("Theme")}
          description={t("ThemeDescription")}
          left={(props) => <List.Icon {...props} icon="palette" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("ThemeSetting")}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>{t("About")}</List.Subheader>
        <List.Item
          title={t("Sources")}
          description={t("SourcesDescription")}
          left={(props) => <List.Icon {...props} icon="book-open-variant" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("Sources")}
        />
        <List.Item
          title={t("DataPolicy")}
          description={t("DataPolicyDescription")}
          left={(props) => <List.Icon {...props} icon="database" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("DataPolicy")}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>{t("Community")}</List.Subheader>
        <List.Item
          title="Instagram"
          left={(props) => <List.Icon {...props} icon="instagram" />}
          right={(props) => <List.Icon {...props} icon="open-in-new" />}
          onPress={() => Linking.openURL(INSTAGRAM_URL)}
        />
        <List.Item
          title="GitHub"
          left={(props) => <List.Icon {...props} icon="github" />}
          right={(props) => <List.Icon {...props} icon="open-in-new" />}
          onPress={() => Linking.openURL(GITHUB_URL)}
        />
        {Platform.OS === "android" && (
          <List.Item
            title={t("RateApp")}
            description={t("RateAppDescription")}
            left={(props) => <List.Icon {...props} icon="star" />}
            right={(props) => <List.Icon {...props} icon="open-in-new" />}
            onPress={() => Linking.openURL(PLAY_STORE_URL)}
          />
        )}
        <List.Item
          title={t("Contact")}
          description={t("ContactDescription")}
          left={(props) => <List.Icon {...props} icon="email" />}
          right={(props) => <List.Icon {...props} icon="open-in-new" />}
          onPress={() => Linking.openURL("mailto:impactech@proton.me")}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  footer: {
    marginTop: "auto",
    paddingVertical: 16,
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40,
  },
  footerText: {
    textAlign: "center",
  },
});
