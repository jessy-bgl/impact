import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { DataTable, Text } from "react-native-paper";

import { EmissionCategory } from "../../../domain/models/emissionCategories";

type Props = {
  emissionCategories: EmissionCategory[];
};

export const EmissionsDataTable = ({ emissionCategories }: Props) => {
  const { t } = useTranslation("emissions");

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Catégorie</DataTable.Title>
        <DataTable.Title numeric>Emissions</DataTable.Title>
        <DataTable.Title numeric>Proportion</DataTable.Title>
      </DataTable.Header>

      {emissionCategories.map((emissionsCategory) => (
        <DataTable.Row key={emissionsCategory.type}>
          <DataTable.Cell style={{ alignItems: "center" }}>
            {emissionsCategory.type}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {emissionsCategory.value} kgCO2/{t("year")}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <View
              style={{
                flex: 1,
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                backgroundColor: emissionsCategory.color,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "black", fontSize: 12 }}>
                {emissionsCategory.part}%
              </Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};
