import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { Divider, List } from "react-native-paper";

import { MenuNavigationProp } from "@app/MenuNavigator";

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
          onPress={() => navigation.navigate("ThemeScreen")}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>{t("About")}</List.Subheader>
        <List.Item
          title={t("MyData")}
          description={t("MyDataDescription")}
          left={(props) => <List.Icon {...props} icon="database" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("MyDataScreen")}
        />
        <List.Item
          title={t("Sources")}
          description={t("SourcesDescription")}
          left={(props) => <List.Icon {...props} icon="book-open-variant" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("SourcesScreen")}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>{t("Community")}</List.Subheader>
        <List.Item
          title={t("RateApp")}
          description={t("RateAppDescription")}
          left={(props) => <List.Icon {...props} icon="star" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("RateAppScreen")}
        />
        <List.Item
          title={t("FollowUs")}
          description={t("FollowUsDescription")}
          left={(props) => <List.Icon {...props} icon="account-group" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("FollowUsScreen")}
        />
        <List.Item
          title={t("Contact")}
          left={(props) => <List.Icon {...props} icon="email" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("ContactScreen")}
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
