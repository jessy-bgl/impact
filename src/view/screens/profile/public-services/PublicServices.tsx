import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text, Card, Icon } from "react-native-paper";
import { AppTheme } from "../../../../../AppTheme";

export const PublicServicesProfile = () => {
  const { t } = useTranslation("publicServices");

  return (
    <View style={styles.container}>
      <Card mode="outlined" style={styles.infoCard}>
        <View style={{ padding: 8, flexDirection: "row" }}>
          <View style={{ marginRight: 10, justifyContent: "center" }}>
            <Icon size={20} source="information-outline" />
          </View>
          <Text>{t("info")}</Text>
        </View>
      </Card>
      <Text style={{ marginTop: 10 }}>{t("description1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("description2")}</Text>
      <Text style={{ marginTop: 10 }}>{t("description3")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  infoCard: {
    borderColor: AppTheme.colors.secondary,
    borderRadius: 5,
  },
});
