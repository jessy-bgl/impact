import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { formatTonnes } from "@common/utils/formatTonnes";

type Props = {
  category: FootprintCategoryViewModel;
  name: string;
  examples: string;
  description: string;
};

const badgeSize = 32;

/**
 * One half of the societal services, laid out as a row of the emissions
 * summary: its share, its name and its footprint. It unfolds its description.
 */
export const SocietalServicesAccordion = ({
  category,
  name,
  examples,
  description,
}: Props) => {
  const { t } = useTranslation("common");

  const { colors } = useTheme();

  const palette = useCategoryPalette();

  const tonnes = formatTonnes(category.footprint);

  return (
    <List.Accordion
      title={name}
      description={examples}
      descriptionStyle={{ color: colors.onSurfaceVariant }}
      accessibilityLabel={[
        name,
        `${category.part}%`,
        t("footprintTonnesPerYearA11y", { value: tonnes }),
      ].join(", ")}
      left={({ style }) => (
        <View style={style}>
          <CategoryBadge
            color={palette[category.styleKey]}
            label={`${category.part}%`}
            fontSize={12}
            size={badgeSize}
          />
        </View>
      )}
      right={({ isExpanded }) => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <View style={{ alignItems: "flex-end" }}>
            <Text>{tonnes}</Text>
            <Text
              variant="labelSmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              {t("footprintTonnesPerYear")}
            </Text>
          </View>
          <List.Icon icon={isExpanded ? "chevron-up" : "chevron-down"} />
        </View>
      )}
    >
      <View
        style={{
          paddingLeft: 16 + badgeSize + 16,
          paddingRight: 24,
          paddingBottom: 16,
        }}
      >
        <Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
          {description}
        </Text>
      </View>
    </List.Accordion>
  );
};
