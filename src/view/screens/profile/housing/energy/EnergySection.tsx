import { useTranslation } from "react-i18next";
import {
  Text,
  Checkbox,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import { Controller } from "react-hook-form";

import {
  FormValues,
  useEnergy,
} from "@view/screens/profile/housing/energy/useEnergy";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import {
  HeatingEnergiesLabels,
  WoodTypes,
} from "@domain/models/housing/energy/Energy";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { NumericInput } from "@view/components/forms/NumericInput";

export const EnergySection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const {
    annualFootprint,
    control,
    handleUpdate,
    setValue,
    disableBioGas,
    disableWoodType,
  } = useEnergy();

  return (
    <ListAccordion
      title={t("emissions:housing.energy")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="flash"
    >
      <ListContentContainer>
        <ColumnContainer style={{ gap: 0 }}>
          <Text variant="labelLarge" style={{ marginBottom: 5 }}>
            {t("energy.heatingEnergies")}
          </Text>
          {HeatingEnergiesLabels.filter((energy) => energy !== "bioGas").map(
            (label) => (
              <Controller<FormValues>
                name={label}
                control={control}
                render={({ field: { value } }) => (
                  <Checkbox.Item
                    style={{ height: 40 }}
                    labelVariant="labelLarge"
                    label={t(`energy.energies.${label}`)}
                    status={value === "true" ? "checked" : "unchecked"}
                    onPress={() => {
                      setValue(label, value === "true" ? "false" : "true");
                      handleUpdate(label);
                    }}
                  />
                )}
              />
            ),
          )}
        </ColumnContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge">{t("energy.bioGas")}</Text>
          <Controller<FormValues>
            name="bioGas"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("bioGas");
                }}
                buttons={[
                  {
                    value: "true",
                    label: t("common:yes"),
                    disabled: disableBioGas,
                  },
                  {
                    value: "false",
                    label: t("common:no"),
                    disabled: disableBioGas,
                  },
                ]}
              />
            )}
          />
        </RowContainer>

        <RowContainer style={{ marginTop: 10 }}>
          <Text variant="labelLarge" style={{ flex: 1.5 }}>
            {t("energy.woodType")}
          </Text>
          <Controller<FormValues>
            name="woodType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                style={{ flex: 2 }}
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("woodType");
                }}
                buttons={WoodTypes.map((woodType) => ({
                  value: woodType,
                  label: t(`energy.woodTypes.${woodType}`),
                  disabled: disableWoodType,
                }))}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 1.5 }}>
            {t("energy.annualElectricityConsumption")}
          </Text>
          <Controller<FormValues>
            name="annualElectricityConsumption"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                right={<TextInput.Affix text="kWh" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("annualElectricityConsumption")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("energy.airConditioners")}
          </Text>
          <Controller<FormValues>
            name="airConditioners"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("airConditioners")}
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
