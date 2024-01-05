import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { NumericInput } from "@view/components/forms/NumericInput";
import { FormValues, usePets } from "./usePets";

export const PetsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = usePets();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.pets")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="dog"
    >
      <ListContentContainer>
        <RowContainer style={{ marginBottom: 10 }}>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("pets.title")}
          </Text>
        </RowContainer>

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("pets.smallDogs")}
          </Text>
          <Controller<FormValues>
            name="smallDogs"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("smallDogs")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("pets.mediumDogs")}
          </Text>
          <Controller<FormValues>
            name="mediumDogs"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("mediumDogs")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("pets.bigDogs")}
          </Text>
          <Controller<FormValues>
            name="bigDogs"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("bigDogs")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("pets.cats")}
          </Text>
          <Controller<FormValues>
            name="cats"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("cats")}
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
