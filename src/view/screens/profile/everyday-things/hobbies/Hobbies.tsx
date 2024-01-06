import { useTranslation } from "react-i18next";
import { Checkbox, Text } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import {
  FormValues,
  CulturalLabels,
  SportLabels,
  useHobbies,
} from "./useHobbies";

export const HobbiesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint, setValue } = useHobbies();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.hobbies")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="bike"
    >
      <ListContentContainer>
        <ColumnContainer style={{ gap: 0 }}>
          <Text variant="labelLarge" style={{ marginBottom: 5 }}>
            {t("hobbies.cultural.title")}
          </Text>
          {CulturalLabels.map((label) => (
            <Controller<FormValues>
              key={label}
              name={label}
              control={control}
              render={({ field: { value } }) => (
                <Checkbox.Item
                  style={{ height: 40 }}
                  labelVariant="labelLarge"
                  label={t(`hobbies.cultural.${label}`)}
                  status={value === "true" ? "checked" : "unchecked"}
                  onPress={() => {
                    setValue(label, value === "true" ? "false" : "true");
                    handleUpdate(label);
                  }}
                />
              )}
            />
          ))}
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer style={{ gap: 0 }}>
          <Text variant="labelLarge" style={{ marginBottom: 5 }}>
            {t("hobbies.sport.title")}
          </Text>
          {SportLabels.map((label) => (
            <Controller<FormValues>
              key={label}
              name={label}
              control={control}
              render={({ field: { value } }) => (
                <Checkbox.Item
                  style={{ height: 40 }}
                  labelVariant="labelLarge"
                  label={t(`hobbies.sport.${label}`)}
                  status={value === "true" ? "checked" : "unchecked"}
                  onPress={() => {
                    setValue(label, value === "true" ? "false" : "true");
                    handleUpdate(label);
                  }}
                />
              )}
            />
          ))}
        </ColumnContainer>
      </ListContentContainer>
    </ListAccordion>
  );
};
