import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import {
  FormValues,
  cigarettesConsumptionOptions,
  useTobacco,
} from "./useTobacco";

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
