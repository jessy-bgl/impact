import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";

import { Footprints } from "../../../domain/models/Footprint";

type Props = {
  footprints: Footprints;
};

export const EmissionsDataTable = ({ footprints }: Props) => {
  const { t } = useTranslation(["emissions", "common"]);
  const { colors } = useTheme();

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>{t("category")}</DataTable.Title>
        <DataTable.Title numeric>{t("annualFootprint")}</DataTable.Title>
        <DataTable.Title numeric>{t("part")}</DataTable.Title>
      </DataTable.Header>

      {Object.values(footprints)
        .sort((a, b) => b.value - a.value)
        .map((emissionsCategory) => (
          <DataTable.Row key={emissionsCategory.category}>
            <DataTable.Cell style={{ alignItems: "center" }}>
              {t(`categories.${emissionsCategory.category}`)}
            </DataTable.Cell>

            <DataTable.Cell numeric>
              {emissionsCategory.value} {t("common:footprintKg")}
            </DataTable.Cell>

            <DataTable.Cell numeric>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: emissionsCategory.color,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: colors.background, fontSize: 12 }}>
                  {emissionsCategory.part}%
                </Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
    </DataTable>
  );
};
