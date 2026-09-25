import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

import { isSameRect } from "@common/tour/geometry";
import {
  HOLE_FADE_MS,
  SPOTLIGHT_ANIMATION_MS,
} from "@common/tour/tourConstants";
import { TargetRect } from "@common/tour/types";

type Props = {
  hole: TargetRect;
  radius: number;
  dimColor: string;
  outlineColor: string;
  /** Pulses a ring around the hole: the user is expected to tap it. */
  showBeacon: boolean;
  reducedMotion: boolean;
};

const EASING = Easing.out(Easing.cubic);

/**
 * The dim layer with a hole on the target, its outline and beacon.
 *
 * Mount one per step (keyed) and unmount it as soon as the step changes: on
 * the new architecture, React no longer knows the values the native driver
 * writes, so a hole closed by animating a value back could stay open on
 * screen. Every animated value here is created with the spotlight and only
 * ever runs forward: the hole fades open once, then follows its target.
 */
export const TourSpotlight = ({
  hole,
  radius,
  dimColor,
  outlineColor,
  showBeacon,
  reducedMotion,
}: Props) => {
  const window = useWindowDimensions();

  const [frame] = useState(() => ({
    x: new Animated.Value(hole.x),
    y: new Animated.Value(hole.y),
    width: new Animated.Value(hole.width),
    height: new Animated.Value(hole.height),
  }));
  // 1 fills the hole with the dim color: closed.
  const [cover] = useState(() => new Animated.Value(reducedMotion ? 0 : 1));
  const [beacon] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reducedMotion) {
      cover.setValue(0);
      return;
    }
    const opening = Animated.timing(cover, {
      toValue: 0,
      duration: HOLE_FADE_MS,
      easing: EASING,
      useNativeDriver: true,
    });
    opening.start();
    return () => opening.stop();
  }, [cover, reducedMotion]);

  // The shown target moved (list scrolled through the hole, window resized):
  // follow it. Layout props cannot run on the native driver.
  const lastHole = useRef(hole);
  useEffect(() => {
    const target = {
      x: hole.x,
      y: hole.y,
      width: hole.width,
      height: hole.height,
    };
    if (isSameRect(target, lastHole.current)) return;
    lastHole.current = target;
    const keys = ["x", "y", "width", "height"] as const;
    if (reducedMotion) {
      keys.forEach((key) => frame[key].setValue(target[key]));
      return;
    }
    const glide = Animated.parallel(
      keys.map((key) =>
        Animated.timing(frame[key], {
          toValue: target[key],
          duration: SPOTLIGHT_ANIMATION_MS,
          easing: EASING,
          useNativeDriver: false,
        }),
      ),
    );
    glide.start();
    return () => glide.stop();
  }, [hole.x, hole.y, hole.width, hole.height, reducedMotion, frame]);

  useEffect(() => {
    if (!showBeacon || reducedMotion) return;
    const loop = Animated.loop(
      Animated.timing(beacon, {
        toValue: 1,
        duration: 1400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [showBeacon, reducedMotion, beacon]);

  // Giant border trick: a view whose border covers the whole screen, leaving
  // a rounded, transparent hole in its middle. Unlike four dim rectangles, it
  // keeps the hole's corners dimmed too.
  const border = Math.max(window.width, window.height);

  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          left: Animated.subtract(frame.x, border),
          top: Animated.subtract(frame.y, border),
          width: Animated.add(frame.width, 2 * border),
          height: Animated.add(frame.height, 2 * border),
          borderWidth: border,
          borderRadius: radius + border,
          borderColor: dimColor,
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          left: frame.x,
          top: frame.y,
          width: frame.width,
          height: frame.height,
        }}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: radius, borderWidth: 2, borderColor: outlineColor },
          ]}
        />
        {showBeacon && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: radius,
                borderWidth: 3,
                borderColor: outlineColor,
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
            { borderRadius: radius, backgroundColor: dimColor, opacity: cover },
          ]}
        />
      </Animated.View>
    </>
  );
};
