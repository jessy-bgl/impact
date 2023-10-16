import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  List,
  TextInput,
  Text,
  SegmentedButtons,
  Divider,
} from "react-native-paper";

export const CarSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  return (
    <List.Accordion
      title={t("emissions:transport.car")}
      left={(props) => <List.Icon {...props} icon="car" />}
    >
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text variant="labelLarge" style={{ flex: 1.5 }}>
            {t("car.kmPerYear")}
          </Text>
          <TextInput
            dense
            mode="outlined"
            keyboardType="numeric"
            right={<TextInput.Affix text="km" />}
            style={{ flex: 1 }}
          />
        </View>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text variant="labelLarge">{t("car.regularUser")}</Text>
          <SegmentedButtons
            density="small"
            value="true"
            onValueChange={() => {}}
            buttons={[
              { value: "true", label: t("common:yes") },
              { value: "false", label: t("common:no") },
            ]}
          />
        </View>
      </View>
    </List.Accordion>
  );
};
