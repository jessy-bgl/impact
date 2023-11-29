import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { List, SegmentedButtons, Text, TextInput } from "react-native-paper";

import { FormValues, useDrinks } from "./useDrinks";
import { MilkTypes } from "../../../../../domain/models/food/types";
import { ColumnContainer } from "../../components/ColumnContainer";
import { ListContentContainer } from "../../components/ListContentContainer";
import { ListItemDivider } from "../../components/ListItemDivider";
import { ListTitle } from "../../components/ListTitle";
import { RowContainer } from "../../components/RowContainer";

export const DrinksSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint, disableMilkSelection } =
    useDrinks();

  return (
    <List.Accordion
      title={
        <ListTitle
          title={t("emissions:food.drinks")}
          subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        />
      }
      left={(props) => <List.Icon {...props} icon="water" />}
    >
      <ListContentContainer>
        <RowContainer style={{ marginBottom: 10 }}>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("drinks.hotDrinksPerWeek")}
          </Text>
        </RowContainer>

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("drinks.chocolatePerWeek")}
          </Text>
          <Controller<FormValues>
            name="chocolatePerWeek"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                dense
                mode="outlined"
                keyboardType="numeric"
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("chocolatePerWeek")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>
        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("drinks.coffeePerWeek")}
          </Text>
          <Controller<FormValues>
            name="coffeePerWeek"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                dense
                mode="outlined"
                keyboardType="numeric"
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("coffeePerWeek")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>
        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("drinks.teaPerWeek")}
          </Text>
          <Controller<FormValues>
            name="teaPerWeek"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                dense
                mode="outlined"
                keyboardType="numeric"
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("teaPerWeek")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>
        <ColumnContainer>
          <Text variant="labelLarge">{t("milk.type")}</Text>
          <Controller<FormValues>
            name="milkType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("milkType");
                }}
                buttons={MilkTypes.map((type) => ({
                  value: type,
                  label: t(`milk.types.${type}`),
                  disabled: disableMilkSelection,
                }))}
              />
            )}
          />
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer>
          <Text variant="labelLarge">{t("drinks.bottledWater")}</Text>
          <View>
            <Controller<FormValues>
              name="bottledWater"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("bottledWater");
                  }}
                  buttons={[
                    { value: "true", label: t("common:yes") },
                    { value: "false", label: t("common:no") },
                  ]}
                />
              )}
            />
          </View>
        </ColumnContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("drinks.sodaLitersPerWeek")}
          </Text>
          <Controller<FormValues>
            name="sodaLitersPerWeek"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                dense
                mode="outlined"
                keyboardType="numeric"
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("sodaLitersPerWeek")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("drinks.alcoholLitersPerWeek")}
          </Text>
          <Controller<FormValues>
            name="alcoholLitersPerWeek"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                dense
                mode="outlined"
                keyboardType="numeric"
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("alcoholLitersPerWeek")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>
      </ListContentContainer>
    </List.Accordion>
  );
};
