/** Window-absolute rectangle, as returned by `measureInWindow`. */
export type TargetRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TourPlacement = "auto" | "top" | "bottom";

/**
 * - `waiting`: the step lives on another screen, nothing is shown.
 * - `measuring`: the step's screen is displayed, its target is being located.
 * - `visible`: the step is shown.
 */
export type TourStatus = "idle" | "waiting" | "measuring" | "visible";

export type SkipReason = "target_missing";

/**
 * How the user moves past a step:
 * - `button`: the tooltip's "next" button.
 * - `screenChange`: by opening another screen through the spotlight hole.
 * - `action`: by acting on the spotlighted element, which reports it with
 *   `useTourStepAction`.
 */
export type TourAdvance = "button" | "screenChange" | "action";

/** Anything that can report its window-absolute position (a host View). */
export type MeasurableNode = {
  measureInWindow?: (
    callback: (x: number, y: number, width: number, height: number) => void,
  ) => void;
};

/** A scrollable screen able to bring a tour target into view. */
export type TourScrollContainer = {
  /** Route name of the screen holding it; only that screen's container scrolls. */
  screen: string;
  /** Resolves true when it had to scroll, so the target must be measured again. */
  ensureVisible: (node: MeasurableNode) => Promise<boolean>;
};

export type TourStep = {
  id: string;
  /** Route names the step belongs to. */
  screens: string[];
  /** Target id to spotlight. Undefined renders a centered card with no hole. */
  target?: string;
  /** i18n sub-key: `<prefix>.<i18nKey>.title` and `.body`. */
  i18nKey: string;
  placement?: TourPlacement;
  padding?: number;
  radius?: number;
  /** Skipped quickly and silently when its target never shows up. */
  optional?: boolean;
  /** Defaults to `button`. */
  advance?: TourAdvance;
};

export type TourWindow = {
  width: number;
  height: number;
};

export type TourInsets = {
  top: number;
  bottom: number;
};
