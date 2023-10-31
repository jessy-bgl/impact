import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { List, SegmentedButtons, Text, TextInput } from "react-native-paper";

import { FormValues, useTwhoWheeler } from "./useTwoWheeler";
import { TwoWheelerTypes } from "../../../../../domain/models/transport/two-wheeler/TwoWheeler";
import { ColumnContainer } from "../../components/ColumnContainer";
import { ListContentContainer } from "../../components/ListContentContainer";
import { ListItemDivider } from "../../components/ListItemDivider";
import { ListTitle } from "../../components/ListTitle";
import { RowContainer } from "../../components/RowContainer";

export const TwoWheelerSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { control, handleUpdate, usage, annualFootprint } = useTwhoWheeler();

  return (
    <List.Accordion
      title={
        <ListTitle
          title={t("emissions:transport.twoWheeler")}
          subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        />
      }
      left={(props) => <List.Icon {...props} icon="motorbike" />}
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge">{t("twoWheeler.usage")}</Text>
          <Controller<FormValues>
            name="usage"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("usage");
                }}
                buttons={[
                  { value: "true", label: t("common:yes") },
                  { value: "false", label: t("common:no") },
                ]}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <ColumnContainer>
          <Text variant="labelLarge">{t("twoWheeler.type")}</Text>
          <View>
            <Controller<FormValues>
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("type");
                  }}
                  buttons={TwoWheelerTypes.slice(0, 2).map((type) => ({
                    value: type,
                    label: t(`twoWheeler.types.${type}`),
                    disabled: !usage,
                  }))}
                />
              )}
            />
            <Controller<FormValues>
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("type");
                  }}
                  buttons={TwoWheelerTypes.slice(2, 4).map((type) => ({
                    value: type,
                    label: t(`twoWheeler.types.${type}`),
                    disabled: !usage,
                  }))}
                />
              )}
            />
          </View>
        </ColumnContainer>

        <ListItemDivider />

        <RowContainer>
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
                disabled={!usage}
              />
            )}
          />
        </RowContainer>
      </ListContentContainer>
    </List.Accordion>
  );
};
