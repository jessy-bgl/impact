import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Portal, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  computeDimRects,
  computeHole,
  computeHoleRadius,
} from "@common/tour/spotlightRects";
import { computeTooltipLayout } from "@common/tour/tooltipLayout";
import { TourSpotlight } from "@common/tour/TourSpotlight";
import { TourTooltip, TourTooltipLabels } from "@common/tour/TourTooltip";
import {
  DEFAULT_HOLE_PADDING,
  DEFAULT_HOLE_RADIUS,
  DIM_OPACITY_DARK,
  DIM_OPACITY_LIGHT,
  TOOLTIP_ARROW_SIZE,
  TOOLTIP_FADE_MS,
  TOOLTIP_MARGIN,
} from "@common/tour/tourConstants";
import { TargetRect, TourPlacement } from "@common/tour/types";
import { useReducedMotion } from "@common/tour/useReducedMotion";

type Props = {
  visible: boolean;
  /**
   * The step's target is still being located: the whole screen stays dimmed,
   * with no spotlight and no card yet.
   */
  pending?: boolean;
  /** Null spotlights nothing: the whole screen dims and the card is centered. */
  rect: TargetRect | null;
  /** Lets touches reach the spotlighted element: the user acts on the app. */
  interactive?: boolean;
  padding?: number;
  radius?: number;
  placement?: TourPlacement;
  title: string;
  body: string;
  stepIndex: number;
  stepCount: number;
  progressLabel: string;
  labels: TourTooltipLabels;
  showPrevious: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
};

/**
 * Opacity and transform run on the native driver: they keep going while the
 * JS thread is busy, as when a list unfolds.
 */
const timing = (value: Animated.Value, toValue: number, duration: number) =>
  Animated.timing(value, {
    toValue,
    duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });

/**
 * Fades its content in once `shown`. Keyed per step: its value is created
 * with it and only runs forward, never animated back to hidden. Hiding is
 * unmounting, which takes effect in the very render that changes the step.
 */
const FadeIn = ({
  shown,
  reducedMotion,
  children,
}: PropsWithChildren<{ shown: boolean; reducedMotion: boolean }>) => {
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!shown) return;
    if (reducedMotion) {
      opacity.setValue(1);
      return;
    }
    const animation = timing(opacity, 1, TOOLTIP_FADE_MS);
    animation.start();
    return () => animation.stop();
  }, [shown, reducedMotion, opacity]);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
};

export const TourOverlay = ({
  visible,
  pending = false,
  rect,
  interactive = false,
  padding = DEFAULT_HOLE_PADDING,
  radius = DEFAULT_HOLE_RADIUS,
  placement,
  title,
  body,
  stepIndex,
  stepCount,
  progressLabel,
  labels,
  showPrevious,
  isLastStep,
  onPrevious,
  onNext,
  onSkip,
}: Props) => {
  const { colors, dark } = useTheme();
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();

  const dimColor = `rgba(0, 0, 0, ${dark ? DIM_OPACITY_DARK : DIM_OPACITY_LIGHT})`;

  // First pass renders the card invisible to learn its height, second pass
  // positions it: prevents the tooltip from flashing then jumping.
  const [tooltipHeight, setTooltipHeight] = useState<number>();

  // A new step means a new height to learn, so forget the previous one.
  const contentKey = `${title}|${body}|${rect === null}|${interactive}`;
  const [lastContentKey, setLastContentKey] = useState(contentKey);
  if (contentKey !== lastContentKey) {
    setLastContentKey(contentKey);
    setTooltipHeight(undefined);
  }

  // While the next target is being located, the spotlight and the card are
  // not rendered at all: they vanish in the render that changes the step, then
  // show up afresh on the new target once it has come to rest.
  const hole =
    visible && !pending && rect ? computeHole(rect, padding, window) : null;
  const holeRadius = hole ? computeHoleRadius(hole, radius) : 0;

  const [tooltipScale] = useState(() => new Animated.Value(1));

  const isTooltipShown = visible && !pending && tooltipHeight !== undefined;

  // Moves screen reader focus onto each new card, so it is read right away.
  const titleRef = useRef<View>(null);
  useEffect(() => {
    if (!isTooltipShown || !titleRef.current) return;
    // react-native-web has no sendAccessibilityEvent: move DOM focus instead.
    if (Platform.OS === "web") {
      titleRef.current.focus();
      return;
    }
    AccessibilityInfo.sendAccessibilityEvent(titleRef.current, "focus");
  }, [isTooltipShown, contentKey]);

  // Tapping outside the card is not an error, just a nudge back to it.
  const nudge = () => {
    if (reducedMotion) return;
    Animated.sequence([
      timing(tooltipScale, 1.04, 90),
      timing(tooltipScale, 1, 140),
    ]).start();
  };

  if (!visible) return null;

  const blockers = hole
    ? computeDimRects(hole, window)
    : [{ x: 0, y: 0, width: window.width, height: window.height }];
  if (hole && !interactive) blockers.push(hole);

  const layout = hole
    ? computeTooltipLayout({
        hole,
        tooltipHeight: tooltipHeight ?? 0,
        window,
        insets,
        placement,
        radius: holeRadius,
      })
    : undefined;

  const tooltipStyle = layout
    ? { top: layout.top, left: layout.left, width: layout.width }
    : {
        top: Math.max(
          insets.top + TOOLTIP_MARGIN,
          (window.height - (tooltipHeight ?? 0)) / 2,
        ),
        left: TOOLTIP_MARGIN,
        right: TOOLTIP_MARGIN,
      };

  return (
    <Portal>
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={StyleSheet.absoluteFill}
      >
        {hole ? (
          <TourSpotlight
            key={contentKey}
            hole={hole}
            radius={holeRadius}
            dimColor={dimColor}
            outlineColor={colors.primary}
            showBeacon={interactive}
            reducedMotion={reducedMotion}
          />
        ) : (
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: dimColor }]}
          />
        )}
      </View>

      {blockers.map((blocker, index) => (
        <Pressable
          key={index}
          testID="tour-blocker"
          // Swallows taps outside the hole so the tour cannot be side-stepped.
          onPress={nudge}
          accessible={false}
          importantForAccessibility="no"
          style={{
            position: "absolute",
            left: blocker.x,
            top: blocker.y,
            width: blocker.width,
            height: blocker.height,
          }}
        />
      ))}

      {visible && !pending && (
        <Animated.View
          pointerEvents="box-none"
          accessibilityViewIsModal={!interactive}
          style={[
            styles.tooltip,
            tooltipStyle,
            { transform: [{ scale: tooltipScale }] },
          ]}
        >
          <FadeIn
            // Remounted on every new step: its opacity starts afresh, and
            // `onLayout` only fires when the frame changes, so a card the same
            // size as the previous one would never report its height.
            key={contentKey}
            shown={isTooltipShown}
            reducedMotion={reducedMotion}
          >
            {layout && (
              <View
                pointerEvents="none"
                style={[
                  styles.arrow,
                  {
                    left: layout.arrowLeft,
                    ...(layout.side === "bottom"
                      ? {
                          top: -TOOLTIP_ARROW_SIZE,
                          borderBottomWidth: TOOLTIP_ARROW_SIZE,
                          borderBottomColor: colors.elevation.level3,
                        }
                      : {
                          bottom: -TOOLTIP_ARROW_SIZE,
                          borderTopWidth: TOOLTIP_ARROW_SIZE,
                          borderTopColor: colors.elevation.level3,
                        }),
                  },
                ]}
              />
            )}
            <TourTooltip
              title={title}
              body={body}
              stepIndex={stepIndex}
              stepCount={stepCount}
              progressLabel={progressLabel}
              labels={labels}
              showPrevious={showPrevious}
              isActionStep={interactive}
              isLastStep={isLastStep}
              onPrevious={onPrevious}
              onNext={onNext}
              onSkip={onSkip}
              titleRef={titleRef}
              onLayout={(event) =>
                setTooltipHeight(event.nativeEvent.layout.height)
              }
            />
          </FadeIn>
        </Animated.View>
      )}
    </Portal>
  );
};

const styles = StyleSheet.create({
  tooltip: { position: "absolute", maxWidth: 500, alignSelf: "center" },
  arrow: {
    position: "absolute",
    width: 0,
    height: 0,
    borderLeftWidth: TOOLTIP_ARROW_SIZE,
    borderRightWidth: TOOLTIP_ARROW_SIZE,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});
