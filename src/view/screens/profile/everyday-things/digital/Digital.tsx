import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { SegmentedButtons, Text } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { NumericInput } from "@view/components/forms/NumericInput";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { preservationOptions } from "@domain/models/everyday-things/types";
import { FormValues, useDigital, DigitalLabels } from "./useDigital";

export const DigitalSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = useDigital();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.digital")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="devices"
    >
      <ListContentContainer>
        <ColumnContainer>
          <Text variant="labelLarge">{t("digital.preservation")}</Text>
          <Controller<FormValues>
            name="preservation"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("preservation");
                  }}
                  buttons={preservationOptions.slice(0, 2).map((option) => ({
                    value: option,
                    label: t(`digital.preservationChoices.${option}`),
                  }))}
                />
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("preservation");
                  }}
                  buttons={preservationOptions.slice(2, 4).map((option) => ({
                    value: option,
                    label: t(`digital.preservationChoices.${option}`),
                  }))}
                />
              </View>
            )}
          />
        </ColumnContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("digital.title")}
          </Text>
        </RowContainer>

        {DigitalLabels.map((label) => (
          <RowContainer key={label} style={{ marginTop: 10 }}>
            <Text variant="labelLarge" style={{ flex: 3 }}>
              {t(`digital.${label}`)}
            </Text>
            <Controller<FormValues>
              name={label}
              control={control}
              render={({ field: { onChange, value } }) => (
                <NumericInput
                  style={{ flex: 1 }}
                  onBlur={() => handleUpdate(label)}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </RowContainer>
        ))}

        <ListItemDivider />

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.internetDailyHours")}
          </Text>
          <Controller<FormValues>
            name="internetDailyHours"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("internetDailyHours")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>
      </ListContentContainer>
    </ListAccordion>
  );
};
