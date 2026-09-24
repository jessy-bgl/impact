import { Ref } from "react";
import { LayoutChangeEvent, Platform, StyleSheet, View } from "react-native";
import {
  Button,
  Icon,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import { CLOSE_HIT_SLOP } from "@common/tour/tourConstants";

export type TourTooltipLabels = {
  previous: string;
  next: string;
  finish: string;
  close: string;
  /** Replaces the buttons on steps where the user acts on the app itself. */
  actionHint: string;
};

type Props = {
  title: string;
  body: string;
  stepIndex: number;
  stepCount: number;
  /** Spoken version of the progress dots, e.g. "Étape 2 sur 5". */
  progressLabel: string;
  labels: TourTooltipLabels;
  showPrevious: boolean;
  isActionStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
  /** Focused by screen readers when the card shows up. */
  titleRef?: Ref<View>;
};

const DOT_SIZE = 6;
const ACTIVE_DOT_WIDTH = 16;

export const TourTooltip = ({
  title,
  body,
  stepIndex,
  stepCount,
  progressLabel,
  labels,
  showPrevious,
  isActionStep,
  isLastStep,
  onPrevious,
  onNext,
  onSkip,
  onLayout,
  titleRef,
}: Props) => {
  const { colors } = useTheme();

  return (
    <Surface elevation={3} style={styles.surface} onLayout={onLayout}>
      <View style={styles.header}>
        <View
          ref={titleRef}
          accessible
          accessibilityRole="header"
          // Lets the web build focus the title without adding a tab stop.
          tabIndex={Platform.OS === "web" ? -1 : undefined}
          style={styles.title}
        >
          <Text variant="titleMedium">{title}</Text>
        </View>
        <IconButton
          icon="close"
          size={20}
          accessibilityLabel={labels.close}
          hitSlop={CLOSE_HIT_SLOP}
          onPress={onSkip}
          style={styles.close}
        />
      </View>

      <Text variant="bodyMedium">{body}</Text>

      <View style={styles.footer}>
        <View accessible accessibilityLabel={progressLabel} style={styles.dots}>
          {Array.from({ length: stepCount }, (_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === stepIndex && styles.activeDot,
                {
                  backgroundColor:
                    index <= stepIndex ? colors.primary : colors.outlineVariant,
                },
              ]}
            />
          ))}
        </View>

        {isActionStep ? (
          <View style={styles.actionHint}>
            <Icon source="gesture-tap" size={18} color={colors.primary} />
            <Text variant="labelLarge" style={{ color: colors.primary }}>
              {labels.actionHint}
            </Text>
          </View>
        ) : (
          <View style={styles.actions}>
            {showPrevious && (
              <Button compact mode="text" onPress={onPrevious}>
                {labels.previous}
              </Button>
            )}
            <Button
              compact
              mode="contained"
              icon={isLastStep ? "rocket-launch" : undefined}
              onPress={onNext}
            >
              {isLastStep ? labels.finish : labels.next}
            </Button>
          </View>
        )}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    borderRadius: 16,
    padding: 16,
    paddingTop: 8,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: { flexShrink: 1 },
  close: { margin: 0, marginRight: -8 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    minHeight: 40,
    gap: 8,
  },
  dots: { flexDirection: "row", alignItems: "center", gap: 4 },
  dot: { width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2 },
  activeDot: { width: ACTIVE_DOT_WIDTH },
  actions: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
  },
});
