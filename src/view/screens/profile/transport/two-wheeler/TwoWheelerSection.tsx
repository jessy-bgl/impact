import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SegmentedButtons, Text, TextInput } from "react-native-paper";

import { TwoWheelerTypes } from "@domain/entities/categories/transport/two-wheeler/TwoWheeler";
import { NumericInput } from "@view/components/forms/NumericInput";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { FormValues, useTwhoWheeler } from "./useTwoWheeler";

export const TwoWheelerSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { control, handleUpdate, usage, annualFootprint } = useTwhoWheeler();

  return (
    <ListAccordion
      title={t("emissions:transport.twoWheeler")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="motorbike"
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 1 }}>
            {t("twoWheeler.usage")}
          </Text>
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
                style={{ flex: 1 }}
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
            {t("twoWheeler.kmPerYear")}
          </Text>
          <Controller<FormValues>
            name="kmPerYear"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
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
    </ListAccordion>
  );
};
