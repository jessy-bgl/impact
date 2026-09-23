/** Delay between two attempts at measuring the current step's target. */
export const MEASURE_RETRY_DELAY_MS = 120;

/** Attempts before a step is skipped because its target never showed up. */
export const MAX_MEASURE_ATTEMPTS = 12;

/**
 * Same, for steps flagged `optional`: give up fast, they are nice-to-have and
 * the whole screen stays dimmed while the tour looks for their target.
 */
export const MAX_MEASURE_ATTEMPTS_OPTIONAL = 4;

/** How long `measureInWindow` gets to call back before the node counts as unmeasurable. */
export const MEASURE_CALLBACK_TIMEOUT_MS = 100;

/** Time left to an animated scroll before the target is measured again. */
export const SCROLL_SETTLE_MS = 400;

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
export const TOOLTIP_FADE_MS = 180;

/** Black scrim; darker on a dark theme, where surfaces are already dark. */
export const DIM_OPACITY_LIGHT = 0.6;
export const DIM_OPACITY_DARK = 0.78;

/** Ensures a close icon still gets a 48dp touch area. */
export const CLOSE_HIT_SLOP = 8;
