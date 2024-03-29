import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Checkbox, RadioButton, Text } from "react-native-paper";

import { WasteQuantity } from "@domain/entities/categories/food/waste/Waste";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { FormValues, useWaste } from "./useWaste";

export const WasteSection = () => {
  const { t } = useTranslation(["food", "emissions", "common"]);
  const {
    control,
    handleUpdate,
    annualFootprint,
    setValue,
    disableWasteBonuses,
  } = useWaste();

  return (
    <ListAccordion
      title={t("emissions:food.waste")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="recycle"
    >
      <ListContentContainer>
        <ColumnContainer>
          <Text variant="labelLarge">{t("waste.quantity")}</Text>
          <Controller<FormValues>
            name="quantity"
            control={control}
            render={({ field: { value } }) => (
              <RadioButton.Group
                value={value}
                onValueChange={(newValue) => {
                  setValue("quantity", newValue);
                  handleUpdate("quantity");
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <RadioButton value={"base" as WasteQuantity} />
                  <Text>{t("waste.quantities.base")}</Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <RadioButton value={"reduction" as WasteQuantity} />
                  <Text>{t("waste.quantities.reduction")}</Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <RadioButton value={"zero" as WasteQuantity} />
                  <Text>{t("waste.quantities.zero")}</Text>
                </View>
              </RadioButton.Group>
            )}
          />
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer style={{ gap: 0 }}>
          <Text variant="labelLarge" style={{ marginBottom: 5 }}>
            {t("waste.bonus")}
          </Text>
          <Controller<FormValues>
            name="wasteComposting"
            control={control}
            render={({ field: { value } }) => (
              <Checkbox.Item
                style={{ height: 40 }}
                disabled={disableWasteBonuses}
                labelVariant="labelLarge"
                label={t("waste.bonuses.wasteComposting")}
                status={value === "true" ? "checked" : "unchecked"}
                onPress={() => {
                  setValue(
                    "wasteComposting",
                    value === "true" ? "false" : "true",
                  );
                  handleUpdate("wasteComposting");
                }}
              />
            )}
          />
          <Controller<FormValues>
            name="noFoodWaste"
            control={control}
            render={({ field: { value } }) => (
              <Checkbox.Item
                style={{ height: 40 }}
                disabled={disableWasteBonuses}
                labelVariant="labelLarge"
                label={t("waste.bonuses.noFoodWaste")}
                status={value === "true" ? "checked" : "unchecked"}
                onPress={() => {
                  setValue("noFoodWaste", value === "true" ? "false" : "true");
                  handleUpdate("noFoodWaste");
                }}
              />
            )}
          />
          <Controller<FormValues>
            name="stopAdvertisingSticker"
            control={control}
            render={({ field: { value } }) => (
              <Checkbox.Item
                style={{ height: 40 }}
                disabled={disableWasteBonuses}
                labelVariant="labelLarge"
                label={t("waste.bonuses.stopAdvertisingSticker")}
                status={value === "true" ? "checked" : "unchecked"}
                onPress={() => {
                  setValue(
                    "stopAdvertisingSticker",
                    value === "true" ? "false" : "true",
                  );
                  handleUpdate("stopAdvertisingSticker");
                }}
              />
            )}
          />
        </ColumnContainer>
      </ListContentContainer>
    </ListAccordion>
  );
};
