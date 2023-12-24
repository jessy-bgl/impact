import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { Checkbox, SegmentedButtons, Text } from "react-native-paper";

import {
  FormValues,
  useLeisure,
} from "@view/screens/profile/housing/leisure/useLeisure";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { HolidayAccomodationLabels } from "@domain/models/housing/leisure/Leisure";
import { NumericInput } from "@view/components/forms/NumericInput";

export const LeisureSection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const {
    annualFootprint,
    control,
    handleUpdate,
    setValue,
    disablePool,
    showCamping,
    showExchange,
    showHotel,
    showRentals,
    showYouthHostel,
  } = useLeisure();

  return (
    <ListAccordion
      title={t("emissions:housing.leisure")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="beach"
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge">{t("leisure.hasIngroundPool")}</Text>
          <Controller<FormValues>
            name="hasIngroundPool"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("hasIngroundPool");
                }}
                buttons={[
                  {
                    value: "true",
                    label: t("common:yes"),
                    disabled: disablePool,
                  },
                  {
                    value: "false",
                    label: t("common:no"),
                  },
                ]}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <ColumnContainer style={{ gap: 0 }}>
          <Text variant="labelLarge" style={{ marginBottom: 5 }}>
            {t("leisure.holidayAccomodations")}
          </Text>
          {HolidayAccomodationLabels.map((label) => (
            <Controller<FormValues>
              key={label}
              name={label}
              control={control}
              render={({ field: { value } }) => (
                <Checkbox.Item
                  style={{ height: 40 }}
                  labelVariant="labelLarge"
                  label={t(`leisure.accomodations.${label}`)}
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

        {showHotel && (
          <>
            <ListItemDivider />
            <RowContainer>
              <Text variant="labelLarge" style={{ flex: 3 }}>
                {t("leisure.hotelNightsPerYear")}
              </Text>
              <Controller<FormValues>
                name="hotelNightsPerYear"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumericInput
                    style={{ flex: 1 }}
                    onBlur={() => handleUpdate("hotelNightsPerYear")}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </RowContainer>
          </>
        )}

        {showRentals && (
          <>
            <ListItemDivider />
            <RowContainer>
              <Text variant="labelLarge" style={{ flex: 3 }}>
                {t("leisure.rentalNightsPerYear")}
              </Text>
              <Controller<FormValues>
                name="rentalNightsPerYear"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumericInput
                    style={{ flex: 1 }}
                    onBlur={() => handleUpdate("rentalNightsPerYear")}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </RowContainer>
          </>
        )}

        {showYouthHostel && (
          <>
            <ListItemDivider />
            <RowContainer>
              <Text variant="labelLarge" style={{ flex: 3 }}>
                {t("leisure.youthHostelNightsPerYear")}
              </Text>
              <Controller<FormValues>
                name="youthHostelNightsPerYear"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumericInput
                    style={{ flex: 1 }}
                    onBlur={() => handleUpdate("youthHostelNightsPerYear")}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </RowContainer>
          </>
        )}

        {showCamping && (
          <>
            <ListItemDivider />
            <RowContainer>
              <Text variant="labelLarge" style={{ flex: 3 }}>
                {t("leisure.campingNightsPerYear")}
              </Text>
              <Controller<FormValues>
                name="campingNightsPerYear"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumericInput
                    style={{ flex: 1 }}
                    onBlur={() => handleUpdate("campingNightsPerYear")}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </RowContainer>
          </>
        )}

        {showExchange && (
          <>
            <ListItemDivider />
            <RowContainer>
              <Text variant="labelLarge" style={{ flex: 3 }}>
                {t("leisure.exchangeNightsPerYear")}
              </Text>
              <Controller<FormValues>
                name="exchangeNightsPerYear"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumericInput
                    style={{ flex: 1 }}
                    onBlur={() => handleUpdate("exchangeNightsPerYear")}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </RowContainer>
          </>
        )}
      </ListContentContainer>
    </ListAccordion>
  );
};
