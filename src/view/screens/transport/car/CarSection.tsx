import { Controller } from "react-hook-form";
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

import { FormValues, useCar } from "./useCar";
import { styles } from "../styles";

export const CarSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { container, rowContainer, divider, columnContainer } = styles;
  const { control, handleUpdate } = useCar();

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
          <Controller<FormValues>
            name="kmPerYear"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                dense
                mode="outlined"
                keyboardType="numeric"
                right={<TextInput.Affix text="km" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("kmPerYear")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <Divider style={divider} />

        <View style={rowContainer}>
          <Text variant="labelLarge">{t("car.regularUser")}</Text>
          <Controller<FormValues>
            name="regularUser"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("regularUser");
                }}
                buttons={[
                  { value: "true", label: t("common:yes") },
                  { value: "false", label: t("common:no") },
                ]}
              />
            )}
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
