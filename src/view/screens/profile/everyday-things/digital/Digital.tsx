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
import { FormValues, useDigital } from "./useDigital";

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

        <RowContainer style={{ marginBottom: 10 }}>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("digital.title")}
          </Text>
        </RowContainer>

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.mobilePhones")}
          </Text>
          <Controller<FormValues>
            name="mobilePhones"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("mobilePhones")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.televisions")}
          </Text>
          <Controller<FormValues>
            name="televisions"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("televisions")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.laptops")}
          </Text>
          <Controller<FormValues>
            name="laptops"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("laptops")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.desktopComputers")}
          </Text>
          <Controller<FormValues>
            name="desktopComputers"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("desktopComputers")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.tablets")}
          </Text>
          <Controller<FormValues>
            name="tablets"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("tablets")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.videoProjectors")}
          </Text>
          <Controller<FormValues>
            name="videoProjectors"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("videoProjectors")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.cameras")}
          </Text>
          <Controller<FormValues>
            name="cameras"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("cameras")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.homeCinemas")}
          </Text>
          <Controller<FormValues>
            name="homeCinemas"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("homeCinemas")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.bluetoothSpeakers")}
          </Text>
          <Controller<FormValues>
            name="bluetoothSpeakers"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("bluetoothSpeakers")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.vocalSpeakers")}
          </Text>
          <Controller<FormValues>
            name="vocalSpeakers"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("vocalSpeakers")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.smartWatches")}
          </Text>
          <Controller<FormValues>
            name="smartWatches"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("smartWatches")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.gamingConsoles")}
          </Text>
          <Controller<FormValues>
            name="gamingConsoles"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("gamingConsoles")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("digital.portableConsoles")}
          </Text>
          <Controller<FormValues>
            name="portableConsoles"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("portableConsoles")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

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
