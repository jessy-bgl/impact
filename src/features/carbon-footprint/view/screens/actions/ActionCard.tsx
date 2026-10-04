import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Icon, Text, TouchableRipple, useTheme } from "react-native-paper";

import {
  Action,
  ActionState,
  hasKnownSavings,
} from "@carbonFootprint/domain/entities/action/Action";
import { ACTIONS_TOUR_TARGETS } from "@carbonFootprint/domain/entities/tour/actionsTour";
import { useFootprints } from "@carbonFootprint/domain/hooks/useFootprints";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { ActionCardButtons } from "@carbonFootprint/view/screens/actions/ActionCardButtons";
import { useShowActionDescription } from "@carbonFootprint/view/screens/actions/useShowActionDescription";
import { OutlinedCard } from "@common/components/OutlinedCard";
import { useTourTarget } from "@common/tour/useTourTarget";
import {
  formatTonnes,
  isBelowShownTonnes,
  smallestShownTonnes,
} from "@common/utils/formatTonnes";

type Props = {
  action: Action;
  updateState: (newState: ActionState) => void;
  isTourTarget?: boolean;
  width: number;
};

export const ActionCard = ({
  action,
  updateState,
  isTourTarget = false,
  width,
}: Props) => {
  const { t } = useTranslation(["actions", "common"]);

  const { colors, roundness } = useTheme();
  // Paper's MD3 cards round their corners to three times the roundness.
  const cardRadius = roundness * 3;

  const { footprints, annualFootprint } = useFootprints();

  const footprintViewModel = footprints[action.category];

  const palette = useCategoryPalette();

  const showDescription = useShowActionDescription(action, footprintViewModel);

  const tourOptions = { enabled: isTourTarget };
  const savingsTourRef = useTourTarget(
    ACTIONS_TOUR_TARGETS.savings,
    tourOptions,
  );
  const categoryTourRef = useTourTarget(
    ACTIONS_TOUR_TARGETS.category,
    tourOptions,
  );
  const buttonsTourRef = useTourTarget(
    ACTIONS_TOUR_TARGETS.buttons,
    tourOptions,
  );

  const knownSavings = hasKnownSavings(action);
  // Against the whole footprint: against its category alone, a small saving
  // would read big.
  const totalShare = annualFootprint
    ? Math.round((action.savedFootprint / annualFootprint) * 100)
    : 0;
  const tonnes = formatTonnes(action.savedFootprint);
  // Screen readers would spell the "<" out as a sign.
  const spokenTonnes = isBelowShownTonnes(action.savedFootprint)
    ? t("common:lessThanA11y", { value: smallestShownTonnes })
    : tonnes;
  // Under 1 %, the share would round to nothing worth reading.
  const shareText =
    totalShare >= 1 ? t("totalShare", { part: totalShare }) : undefined;

  return (
    <OutlinedCard
      style={{
        width,
        opacity: action.state === "skipped" ? 0.7 : 1,
      }}
    >
      <TouchableRipple
        onPress={showDescription}
        accessibilityRole="button"
        accessibilityLabel={[
          action.label,
          knownSavings && t("savingsA11y", { value: spokenTonnes }),
          knownSavings && shareText,
        ]
          .filter(Boolean)
          .join(", ")}
        accessibilityHint={t("showDetails")}
        borderless
        style={{
          borderTopLeftRadius: cardRadius,
          borderTopRightRadius: cardRadius,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
        >
          <View ref={categoryTourRef} collapsable={false}>
            <CategoryBadge
              color={palette[footprintViewModel.styleKey]}
              icon={footprintViewModel.icon}
              size={40}
            />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="titleMedium">{action.label}</Text>
            {/* An unknown saving shows nothing rather than a misleading zero. */}
            {knownSavings && (
              <View ref={savingsTourRef} collapsable={false}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Icon source="arrow-down" size={18} color={colors.primary} />
                  <Text variant="titleSmall" style={{ color: colors.primary }}>
                    {`${tonnes} ${t("common:footprintTonnesPerYear")}`}
                  </Text>
                </View>
                {shareText && (
                  <Text
                    variant="bodySmall"
                    style={{ color: colors.onSurfaceVariant }}
                  >
                    {shareText}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableRipple>
      <View ref={buttonsTourRef} collapsable={false}>
        <ActionCardButtons
          actionState={action.state}
          updateState={updateState}
        />
      </View>
    </OutlinedCard>
  );
};
