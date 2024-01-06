import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { RadioButton, Text } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import {
  FormValues,
  cigarettesConsumptionOptions,
  useTobacco,
} from "./useTobacco";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";

export const TobaccoSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint, setValue } = useTobacco();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.tobacco")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="smoking"
    >
      <ListContentContainer>
        <ColumnContainer>
          <Text variant="labelLarge">{t("tobacco.title")}</Text>
          <Controller<FormValues>
            name="weeklyConsumption"
            control={control}
            render={({ field: { value } }) => (
              <RadioButton.Group
                value={value}
                onValueChange={(newValue) => {
                  setValue("weeklyConsumption", newValue);
                  handleUpdate("weeklyConsumption");
                }}
              >
                {cigarettesConsumptionOptions.map((option) => (
                  <View
                    key={option}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <RadioButton value={option} />
                    <Text>{t(`tobacco.consumptionFrequencies.${option}`)}</Text>
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
