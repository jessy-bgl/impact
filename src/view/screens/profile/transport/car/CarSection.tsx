import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  HelperText,
  Icon,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";

import {
  carEngines,
  carSizes,
  fuelTypes,
} from "@domain/entities/categories/transport/car/Car";
import { NumericInput } from "@view/components/forms/NumericInput";
import { InfoModal } from "@view/components/modals/InfoModal";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { useStyles } from "@view/screens/profile/utils/useStyles";
import { useState } from "react";
import { InfoDistance } from "./info/InfoDistance";
import { InfoSameCar } from "./info/InfoSameCar";
import { InfoSize } from "./info/InfoSize";
import { FormValues, useCar } from "./useCar";

export const CarSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const [modal, setModal] = useState<InfoModalState>({ show: false });
  const { control, handleUpdate, regularUser, annualFootprint } = useCar();
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
        title={t("emissions:transport.car")}
        subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        icon="car"
      >
        <ListContentContainer>
          <RowContainer>
            <Text
              variant="labelLarge"
              style={{ flex: 1.5, ...infoTextStyle }}
              onPress={() =>
                setModal({ show: true, content: <InfoDistance /> })
              }
            >
              {t("car.kmPerYear")}
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
            <ColumnContainer>
              <Text
                variant="labelLarge"
                onPress={() =>
                  setModal({ show: true, content: <InfoSameCar /> })
                }
              >
                {t("car.regularUser")}
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
            </ColumnContainer>
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
            <Text
              variant="labelLarge"
              onPress={() => setModal({ show: true, content: <InfoSize /> })}
            >
              {t("car.size")}
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
    </>
  );
};
