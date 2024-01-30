import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import {
  FormValues,
  consumptionOptions,
  useConsumableProducts,
} from "./useConsumableProducts";

export const ConsumableProductsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint, setValue } =
    useConsumableProducts();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.consumableProducts")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="washing-machine"
    >
      <ListContentContainer>
        <ColumnContainer>
          <Text variant="labelLarge">{t("consumableProducts.title")}</Text>
          <Controller<FormValues>
            name="consumption"
            control={control}
            render={({ field: { value } }) => (
              <RadioButton.Group
                value={value}
                onValueChange={(newValue) => {
                  setValue("consumption", newValue);
                  handleUpdate("consumption");
                }}
              >
                {consumptionOptions.map((option) => (
                  <View
                    key={option}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <RadioButton value={option} />
                    <Text>
                      {t(`consumableProducts.consumptionFrequencies.${option}`)}
                    </Text>
                  </View>
                ))}
              </RadioButton.Group>
            )}
          />
        </ColumnContainer>
      </ListContentContainer>
    </ListAccordion>
  );
};
