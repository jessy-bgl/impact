import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  List,
  TextInput,
  Text,
  SegmentedButtons,
  Divider,
} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

import { styles } from "../styles";

export const CarSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { container, rowContainer, divider, columnContainer } = styles;

  return (
    <List.Accordion
      title={t("emissions:transport.car")}
      left={(props) => <List.Icon {...props} icon="car" />}
    >
      <View style={container}>
        <View style={rowContainer}>
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

        <Divider style={divider} />

        <View style={rowContainer}>
          <Text variant="labelLarge">{t("car.regularUser")}</Text>
          <SegmentedButtons
            density="small"
            value="1"
            onValueChange={() => {}}
            buttons={[
              { value: "1", label: t("common:yes") },
              { value: "", label: t("common:no") },
            ]}
          />
        </View>

        <Divider style={divider} />

        <View style={columnContainer}>
          <Text variant="labelLarge">{t("car.size")}</Text>
          <View style={{ height: 20 }}>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={
                [
                  // TODO
                ]
              }
            />
          </View>
        </View>
      </View>
    </List.Accordion>
  );
};
