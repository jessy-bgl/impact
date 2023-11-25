import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { List, SegmentedButtons, Text } from "react-native-paper";

import { FormValues, useMeals } from "./useMeals";
import { 
  BreakfastTypes,
  Diets,
  Frequencies,
} from "@domain/models/food/meals/types";
import { MilkTypes } from "@domain/models/food/types";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { ListTitle } from "@view/screens/profile/components/ListTitle";

export const MealsSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);
  const { control, handleUpdate, milkAndCerealsBreakfast, annualFootprint } =
    useMeals();

  return (
    <List.Accordion
      title={
        <ListTitle
          title={t("emissions:food.meals")}
          subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        />
      }
      left={(props) => <List.Icon {...props} icon="food" />}
    >
      <ListContentContainer>
        <ColumnContainer>
          <Text variant="labelLarge">{t("breakfast.type")}</Text>
          <View>
            <Controller<FormValues>
              name="breakfast"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("breakfast");
                  }}
                  buttons={BreakfastTypes.slice(0, 3).map((type) => ({
                    value: type,
                    label: t(`breakfast.types.${type}`),
                  }))}
                />
              )}
            />
            <Controller<FormValues>
              name="breakfast"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("breakfast");
                  }}
                  buttons={BreakfastTypes.slice(3, 5).map((type) => ({
                    value: type,
                    label: t(`breakfast.types.${type}`),
                  }))}
                />
              )}
            />
          </View>
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
                  disabled: !milkAndCerealsBreakfast,
                }))}
              />
            )}
          />
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer>
          <Text variant="labelLarge">{t("diet.type")}</Text>
          <View>
            <Controller<FormValues>
              name="diet"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("diet");
                  }}
                  buttons={Diets.slice(0, 3).map((type) => ({
                    value: type,
                    label: t(`diet.types.${type}`),
                  }))}
                />
              )}
            />
            <Controller<FormValues>
              name="diet"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("diet");
                  }}
                  buttons={Diets.slice(3, 5).map((type) => ({
                    value: type,
                    label: t(`diet.types.${type}`),
                  }))}
                />
              )}
            />
          </View>
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer>
          <Text variant="labelLarge">{t("localProducts")}</Text>
          <View>
            <Controller<FormValues>
              name="localProducts"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("localProducts");
                  }}
                  buttons={Frequencies.slice(0, 2).map((frequency) => ({
                    value: frequency,
                    label: t(`frequencies.${frequency}`),
                  }))}
                />
              )}
            />
            <Controller<FormValues>
              name="localProducts"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("localProducts");
                  }}
                  buttons={Frequencies.slice(2, 4).map((frequency) => ({
                    value: frequency,
                    label: t(`frequencies.${frequency}`),
                  }))}
                />
              )}
            />
          </View>
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer>
          <Text variant="labelLarge">{t("seasonalProducts")}</Text>
          <View>
            <Controller<FormValues>
              name="seasonalProducts"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("seasonalProducts");
                  }}
                  buttons={Frequencies.slice(0, 2).map((frequency) => ({
                    value: frequency,
                    label: t(`frequencies.${frequency}`),
                  }))}
                />
              )}
            />
            <Controller<FormValues>
              name="seasonalProducts"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("seasonalProducts");
                  }}
                  buttons={Frequencies.slice(2, 4).map((frequency) => ({
                    value: frequency,
                    label: t(`frequencies.${frequency}`),
                  }))}
                />
              )}
            />
          </View>
        </ColumnContainer>
      </ListContentContainer>
    </List.Accordion>
  );
};
