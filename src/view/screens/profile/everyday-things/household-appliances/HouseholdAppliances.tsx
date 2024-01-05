import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { SegmentedButtons, Text } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { NumericInput } from "@view/components/forms/NumericInput";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { FormValues, useHouseholdAppliances } from "./useHouseholdAppliances";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { preservationOptions } from "@domain/models/everyday-things/types";

export const HouseholdAppliancesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = useHouseholdAppliances();
  console.log(preservationOptions);
  return (
    <ListAccordion
      title={t("emissions:everydayThings.householdAppliances")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="microwave"
    >
      <ListContentContainer>
        <ColumnContainer>
          <Text variant="labelLarge">
            {t("householdAppliances.preservation")}
          </Text>
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
                    label: t(
                      `householdAppliances.preservationChoices.${option}`,
                    ),
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
                    label: t(
                      `householdAppliances.preservationChoices.${option}`,
                    ),
                  }))}
                />
              </View>
            )}
          />
        </ColumnContainer>

        <ListItemDivider />

        <RowContainer style={{ marginBottom: 10 }}>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("householdAppliances.title")}
          </Text>
        </RowContainer>

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.fridges")}
          </Text>
          <Controller<FormValues>
            name="fridges"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("fridges")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.miniFridges")}
          </Text>
          <Controller<FormValues>
            name="miniFridges"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("miniFridges")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.freezers")}
          </Text>
          <Controller<FormValues>
            name="freezers"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("freezers")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.washingMachines")}
          </Text>
          <Controller<FormValues>
            name="washingMachines"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("washingMachines")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.dryers")}
          </Text>
          <Controller<FormValues>
            name="dryers"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("dryers")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.dishWashers")}
          </Text>
          <Controller<FormValues>
            name="dishWashers"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("dishWashers")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.ovens")}
          </Text>
          <Controller<FormValues>
            name="ovens"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("ovens")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.microwaves")}
          </Text>
          <Controller<FormValues>
            name="microwaves"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("microwaves")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.hotPlates")}
          </Text>
          <Controller<FormValues>
            name="hotPlates"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hotPlates")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.hoods")}
          </Text>
          <Controller<FormValues>
            name="hoods"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hoods")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.kettles")}
          </Text>
          <Controller<FormValues>
            name="kettles"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("kettles")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.coffeeMachines")}
          </Text>
          <Controller<FormValues>
            name="coffeeMachines"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("coffeeMachines")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.vacuumCleaners")}
          </Text>
          <Controller<FormValues>
            name="vacuumCleaners"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("vacuumCleaners")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.kitchenRobots")}
          </Text>
          <Controller<FormValues>
            name="kitchenRobots"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("kitchenRobots")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("householdAppliances.electricLawnMowers")}
          </Text>
          <Controller<FormValues>
            name="electricLawnMowers"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("electricLawnMowers")}
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
