import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  TextInput,
  Text,
  SegmentedButtons,
  HelperText,
  Icon,
} from "react-native-paper";

import {
  carEngines,
  carSizes,
  fuelTypes,
} from "@domain/entities/transport/car/Car";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { NumericInput } from "@view/components/forms/NumericInput";
import { ModalInfoButton } from "@view/screens/profile/components/ModalInfoButton";
import { InfoDistance } from "./info/InfoDistance";
import { InfoSameCar } from "./info/InfoSameCar";
import { InfoSize } from "./info/InfoSize";
import { FormValues, useCar } from "./useCar";

export const CarSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { control, handleUpdate, regularUser, annualFootprint } = useCar();

  return (
    <ListAccordion
      title={t("emissions:transport.car")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="car"
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 1.5 }}>
            {t("car.kmPerYear")}
            <ModalInfoButton modalContent={<InfoDistance />} />
          </Text>
          <Controller<FormValues>
            name="kmPerYear"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                right={<TextInput.Affix text="km" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("kmPerYear")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <ColumnContainer>
          <RowContainer>
            <Text variant="labelLarge">
              {t("car.regularUser")}
              <ModalInfoButton modalContent={<InfoSameCar />} />
            </Text>
            <Controller<FormValues>
              name="regularUser"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("regularUser");
                  }}
                  buttons={[
                    { value: "true", label: t("common:yes") },
                    { value: "false", label: t("common:no") },
                  ]}
                />
              )}
            />
          </RowContainer>
          {!regularUser && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon source="information" size={15} />
              <HelperText
                type="info"
                style={{ alignSelf: "flex-start", marginTop: 2 }}
              >
                {t("car.nonRegularUserHelperText")}
              </HelperText>
            </View>
          )}
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer>
          <Text variant="labelLarge">
            {t("car.size")}
            <ModalInfoButton modalContent={<InfoSize />} />
          </Text>
          <View>
            <Controller<FormValues>
              name="size"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("size");
                  }}
                  buttons={carSizes.slice(0, 3).map((size) => ({
                    value: size,
                    label: t(`car.sizes.${size}`),
                    disabled: !regularUser,
                  }))}
                />
              )}
            />
            <Controller<FormValues>
              name="size"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  density="small"
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    handleUpdate("size");
                  }}
                  buttons={carSizes.slice(3, 5).map((size) => ({
                    value: size,
                    label: t(`car.sizes.${size}`),
                    disabled: !regularUser,
                  }))}
                />
              )}
            />
          </View>
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer>
          <Text variant="labelLarge">{t("car.engine")}</Text>
          <Controller<FormValues>
            name="engine"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("engine");
                }}
                buttons={carEngines.map((engine) => ({
                  value: engine,
                  label: t(`car.engines.${engine}`),
                  disabled: !regularUser,
                }))}
              />
            )}
          />
        </ColumnContainer>

        <ListItemDivider />

        <ColumnContainer>
          <Text variant="labelLarge">{t("car.fuelType")}</Text>
          <Controller<FormValues>
            name="fuelType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("fuelType");
                }}
                buttons={fuelTypes.map((fuelType) => ({
                  value: fuelType,
                  label: t(`car.fuelTypes.${fuelType}`),
                  disabled: !regularUser,
                }))}
              />
            )}
          />
        </ColumnContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("car.averageFuelConsumption")}
          </Text>
          <Controller<FormValues>
            name="averageFuelConsumption"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                disabled={!regularUser}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("averageFuelConsumption")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("car.age")}
          </Text>
          <Controller<FormValues>
            name="age"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("age")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("car.averagePassengers")}
          </Text>
          <Controller<FormValues>
            name="averagePassengers"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("averagePassengers")}
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
