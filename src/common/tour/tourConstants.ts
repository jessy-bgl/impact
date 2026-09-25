/** Time given to a step's target to show up before the step is skipped. */
export const MEASURE_TIMEOUT_MS = 1500;

/**
 * Same, for steps flagged `optional`: give up fast, they are nice-to-have and
 * the whole screen stays dimmed while the tour looks for their target.
 */
export const MEASURE_TIMEOUT_OPTIONAL_MS = 500;

/** How long `measureInWindow` gets to call back before the node counts as unmeasurable. */
export const MEASURE_CALLBACK_TIMEOUT_MS = 100;

/**
 * Interval between two measures of a step's target before it shows: the step
 * waits for two identical ones, so a section unfolding or a list scrolling
 * has come to rest.
 */
export const SETTLE_SAMPLE_MS = 60;

/** Longest wait for the target to come to rest, before showing it anyway. */
export const SETTLE_MAX_MS = 800;

/**
 * Samples without any registered target before an optional step is skipped.
 * Targets register in the commit that mounts them, so a few are plenty, even
 * when the screen defers that commit by a frame (an unfolding section).
 */
export const OPTIONAL_TARGET_SAMPLES = 3;

/** Re-measure period while a step is visible, to follow scroll and layout shifts. */
export const REMEASURE_POLL_MS = 100;

/** Slowest re-measure period, reached by doubling while the target stays put. */
export const REMEASURE_POLL_MAX_MS = 800;

/** Grace period before the tour starts on its own, so the screen is seen first. */
export const AUTO_START_DELAY_MS = 600;

export const DEFAULT_HOLE_PADDING = 8;
export const DEFAULT_HOLE_RADIUS = 12;

export const TOOLTIP_MAX_WIDTH = 360;
export const TOOLTIP_MARGIN = 16;
export const TOOLTIP_ARROW_SIZE = 8;

/** Spotlight glide between two positions; skipped when "reduce motion" is on. */
export const SPOTLIGHT_ANIMATION_MS = 220;
/** Hole reopening on the next target. Closing it is immediate. */
export const HOLE_FADE_MS = 150;
export const TOOLTIP_FADE_MS = 180;

/** Black scrim; darker on a dark theme, where surfaces are already dark. */
export const DIM_OPACITY_LIGHT = 0.6;
export const DIM_OPACITY_DARK = 0.78;

/** Ensures a close icon still gets a 48dp touch area. */
export const CLOSE_HIT_SLOP = 8;
