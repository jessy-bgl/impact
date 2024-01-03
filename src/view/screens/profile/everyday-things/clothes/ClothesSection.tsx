import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { FormValues, useClothes } from "./useClothes";
import { NumericInput } from "@view/components/forms/NumericInput";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";

export const ClothesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = useClothes();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.clothes")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="tshirt-crew"
    >
      <ListContentContainer>
        <RowContainer style={{ marginBottom: 10 }}>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("clothes.title")}
          </Text>
        </RowContainer>

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.tshirts")}
          </Text>
          <Controller<FormValues>
            name="tshirts"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("tshirts")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.shirts")}
          </Text>
          <Controller<FormValues>
            name="shirts"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("shirts")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.sweatshirts")}
          </Text>
          <Controller<FormValues>
            name="sweatshirts"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("sweatshirts")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.sweaters")}
          </Text>
          <Controller<FormValues>
            name="sweaters"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("sweaters")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.shorts")}
          </Text>
          <Controller<FormValues>
            name="shorts"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("shorts")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.coats")}
          </Text>
          <Controller<FormValues>
            name="coats"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("coats")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.dresses")}
          </Text>
          <Controller<FormValues>
            name="dresses"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("dresses")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.pants")}
          </Text>
          <Controller<FormValues>
            name="pants"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("pants")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.shoes")}
          </Text>
          <Controller<FormValues>
            name="shoes"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("shoes")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.smallItems")}
          </Text>
          <Controller<FormValues>
            name="smallItems"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("smallItems")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("clothes.bigItems")}
          </Text>
          <Controller<FormValues>
            name="bigItems"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("bigItems")}
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
