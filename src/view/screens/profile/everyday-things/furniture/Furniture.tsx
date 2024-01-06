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
import { FormValues, useFurniture } from "./useFurniture";

export const FurnitureSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = useFurniture();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.furniture")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bed"
    >
      <ListContentContainer>
        <ColumnContainer>
          <Text variant="labelLarge">{t("furniture.preservation")}</Text>
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
                    label: t(`furniture.preservationChoices.${option}`),
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
                    label: t(`furniture.preservationChoices.${option}`),
                  }))}
                />
              </View>
            )}
          />
        </ColumnContainer>

        <ListItemDivider />

        <RowContainer style={{ marginBottom: 10 }}>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("furniture.title")}
          </Text>
        </RowContainer>

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.wardrobes")}
          </Text>
          <Controller<FormValues>
            name="wardrobes"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("wardrobes")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.couches")}
          </Text>
          <Controller<FormValues>
            name="couches"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("couches")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.mattresses")}
          </Text>
          <Controller<FormValues>
            name="mattresses"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("mattresses")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.beds")}
          </Text>
          <Controller<FormValues>
            name="beds"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("beds")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.tables")}
          </Text>
          <Controller<FormValues>
            name="tables"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("tables")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.chairs")}
          </Text>
          <Controller<FormValues>
            name="chairs"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("chairs")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.smallFurnitures")}
          </Text>
          <Controller<FormValues>
            name="smallFurnitures"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("smallFurnitures")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.bigFurnitures")}
          </Text>
          <Controller<FormValues>
            name="bigFurnitures"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("bigFurnitures")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.woodenGardenFurnitures")}
          </Text>
          <Controller<FormValues>
            name="woodenGardenFurnitures"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("woodenGardenFurnitures")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("furniture.resinOrMetalGardenFurnitures")}
          </Text>
          <Controller<FormValues>
            name="resinOrMetalGardenFurnitures"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("resinOrMetalGardenFurnitures")}
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
