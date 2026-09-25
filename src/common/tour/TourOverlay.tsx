import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

import { isSameRect } from "@common/tour/geometry";
import {
  computeDimRects,
  computeHole,
  computeHoleRadius,
} from "@common/tour/spotlightRects";
import { computeTooltipLayout } from "@common/tour/tooltipLayout";
import { TourTooltip, TourTooltipLabels } from "@common/tour/TourTooltip";
import {
  DEFAULT_HOLE_PADDING,
  DEFAULT_HOLE_RADIUS,
  DIM_OPACITY_DARK,
  DIM_OPACITY_LIGHT,
  HOLE_FADE_MS,
  SPOTLIGHT_ANIMATION_MS,
  TOOLTIP_ARROW_SIZE,
  TOOLTIP_FADE_MS,
  TOOLTIP_MARGIN,
} from "@common/tour/tourConstants";
import { TargetRect, TourPlacement } from "@common/tour/types";
import { useReducedMotion } from "@common/tour/useReducedMotion";

type Props = {
  visible: boolean;
  /**
   * The step's target is still being located: the screen stays dimmed, the
   * spotlight closes where it was, and no card shows yet.
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

const timing = (value: Animated.Value, toValue: number, duration: number) =>
  Animated.timing(value, {
    toValue,
    duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: false,
  });

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

  // While the next target is being located, the spotlight closes where it was
  // instead of blinking out, then reopens right on the new target once it has
  // come to rest: no glide across a screen still unfolding or scrolling.
  const measuredHole =
    visible && rect ? computeHole(rect, padding, window) : null;
  const [lastHole, setLastHole] = useState<TargetRect | null>(null);
  if (!visible && lastHole !== null) setLastHole(null);
  if (measuredHole && !isSameRect(measuredHole, lastHole))
    setLastHole(measuredHole);
  const hole = measuredHole ?? (visible && pending ? lastHole : null);
  const holeRadius = hole ? computeHoleRadius(hole, radius) : 0;

  const [spotlight] = useState(() => ({
    x: new Animated.Value(0),
    y: new Animated.Value(0),
    width: new Animated.Value(0),
    height: new Animated.Value(0),
  }));
  // 1 fills the hole with the dim color: closed.
  const [holeCover] = useState(() => new Animated.Value(1));
  const [tooltipOpacity] = useState(() => new Animated.Value(0));
  const [tooltipScale] = useState(() => new Animated.Value(1));
  const [beacon] = useState(() => new Animated.Value(0));
  const isHoleOpen = useRef(false);

  const holeX = hole?.x;
  const holeY = hole?.y;
  const holeWidth = hole?.width;
  const holeHeight = hole?.height;

  // Layout effect: the spotlight must be in place before the first paint.
  useLayoutEffect(() => {
    if (
      holeX === undefined ||
      holeY === undefined ||
      holeWidth === undefined ||
      holeHeight === undefined
    ) {
      isHoleOpen.current = false;
      holeCover.setValue(1);
      return;
    }
    const target = { x: holeX, y: holeY, width: holeWidth, height: holeHeight };
    const keys = ["x", "y", "width", "height"] as const;
    const cover = pending ? 1 : 0;
    // Only a target that moves while shown is followed with a glide. Anywhere
    // else the hole is closed, or about to open: it jumps into place.
    const glides = isHoleOpen.current && !pending && !reducedMotion;
    isHoleOpen.current = !pending;

    if (!glides) keys.forEach((key) => spotlight[key].setValue(target[key]));
    if (reducedMotion) {
      holeCover.setValue(cover);
      return;
    }

    const animation = Animated.parallel([
      ...(glides
        ? keys.map((key) =>
            timing(spotlight[key], target[key], SPOTLIGHT_ANIMATION_MS),
          )
        : []),
      timing(holeCover, cover, HOLE_FADE_MS),
    ]);
    animation.start();
    return () => animation.stop();
  }, [
    holeX,
    holeY,
    holeWidth,
    holeHeight,
    pending,
    reducedMotion,
    spotlight,
    holeCover,
  ]);

  const isTooltipShown = visible && !pending && tooltipHeight !== undefined;

  useEffect(() => {
    if (!isTooltipShown) {
      tooltipOpacity.setValue(0);
      return;
    }
    if (reducedMotion) {
      tooltipOpacity.setValue(1);
      return;
    }
    const animation = timing(tooltipOpacity, 1, TOOLTIP_FADE_MS);
    animation.start();
    return () => animation.stop();
  }, [isTooltipShown, reducedMotion, tooltipOpacity]);

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

  // A pulsing ring around the element the user is expected to tap.
  const showBeacon = visible && !pending && interactive && hole !== null;
  useEffect(() => {
    if (!showBeacon || reducedMotion) {
      beacon.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(beacon, {
        toValue: 1,
        duration: 1400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => {
      loop.stop();
      beacon.setValue(0);
    };
  }, [showBeacon, reducedMotion, beacon]);

  // Tapping outside the card is not an error, just a nudge back to it.
  const nudge = () => {
    if (reducedMotion) return;
    Animated.sequence([
      timing(tooltipScale, 1.04, 90),
      timing(tooltipScale, 1, 140),
    ]).start();
  };

  if (!visible) return null;

  // Giant border trick: a view whose border covers the whole screen, leaving
  // a rounded, transparent hole in its middle. Unlike four dim rectangles, it
  // keeps the hole's corners dimmed too.
  const cover = Math.max(window.width, window.height);

  const blockers = hole
    ? computeDimRects(hole, window)
    : [{ x: 0, y: 0, width: window.width, height: window.height }];
  // While the next target is located, the hole still frames the previous one:
  // a tap there would reach whatever the new screen holds underneath.
  if (hole && (!interactive || pending)) blockers.push(hole);

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

  const spotlightFrame = {
    position: "absolute" as const,
    left: spotlight.x,
    top: spotlight.y,
    width: spotlight.width,
    height: spotlight.height,
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
          <>
            <Animated.View
              style={{
                position: "absolute",
                left: Animated.subtract(spotlight.x, cover),
                top: Animated.subtract(spotlight.y, cover),
                width: Animated.add(spotlight.width, 2 * cover),
                height: Animated.add(spotlight.height, 2 * cover),
                borderWidth: cover,
                borderRadius: holeRadius + cover,
                borderColor: dimColor,
              }}
            />
            <Animated.View style={spotlightFrame}>
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderRadius: holeRadius,
                    borderWidth: 2,
                    borderColor: colors.primary,
                  },
                ]}
              />
              {showBeacon && (
                <Animated.View
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      borderRadius: holeRadius,
                      borderWidth: 3,
                      borderColor: colors.primary,
                      opacity: beacon.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 0],
                      }),
                      transform: [
                        {
                          scale: beacon.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.12],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              )}
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderRadius: holeRadius,
                    backgroundColor: dimColor,
                    opacity: holeCover,
                  },
                ]}
              />
            </Animated.View>
          </>
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

      <Animated.View
        pointerEvents={pending ? "none" : "box-none"}
        accessibilityViewIsModal={!interactive}
        style={[
          styles.tooltip,
          tooltipStyle,
          { opacity: tooltipOpacity, transform: [{ scale: tooltipScale }] },
        ]}
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
          // Remounted on every new step: `onLayout` only fires when the frame
          // changes, so a card the same size as the previous one would never
          // report its height and would stay invisible.
          key={contentKey}
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
      </Animated.View>
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
