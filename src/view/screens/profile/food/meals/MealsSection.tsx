import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

import {
  BreakfastTypes,
  Diets,
  Frequencies,
} from "@domain/entities/categories/food/meals/types";
import { MilkTypes } from "@domain/entities/categories/food/types";
import { InfoModal } from "@view/components/modals/InfoModal";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { InfoDiet } from "@view/screens/profile/food/meals/info/InfoDiet";
import { useStyles } from "@view/screens/profile/utils/useStyles";
import { FormValues, useMeals } from "./useMeals";

export const MealsSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);
  const [modal, setModal] = useState<InfoModalState>({ show: false });
  const { control, handleUpdate, milkAndCerealsBreakfast, annualFootprint } =
    useMeals();
  const { infoTextStyle } = useStyles();

  return (
    <>
      {modal.show && (
        <InfoModal
          content={modal.content}
          hide={() => setModal({ show: false })}
        />
      )}

      <ListAccordion
        title={t("emissions:food.meals")}
        subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        icon="food"
      >
        <ListContentContainer>
          <ColumnContainer>
            <Text variant="labelLarge">{t("breakfast.type")} </Text>
            <View>
              <Controller<FormValues>
                name="breakfast"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
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
                  </>
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
            <Text
              variant="labelLarge"
              style={{ flex: 1.5, ...infoTextStyle }}
              onPress={() => setModal({ show: true, content: <InfoDiet /> })}
            >
              {t("diet.type")}
            </Text>
            <View>
              <Controller<FormValues>
                name="diet"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
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
                  </>
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
                  <>
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
                  </>
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
                  <>
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
                  </>
                )}
              />
            </View>
          </ColumnContainer>
        </ListContentContainer>
      </ListAccordion>
    </>
  );
};
