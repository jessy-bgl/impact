import { TourStep } from "@common/tour/types";

/** Namespaced root key holding every step's `title` and `body`. */
export const ACTIONS_TOUR_I18N_PREFIX = "intro:actions.tour";

export const ACTIONS_TOUR_TARGETS = {
  savings: "actions.savings",
  category: "actions.category",
  buttons: "actions.buttons",
  tabs: "actions.tabs",
  emissionsTab: "actions.emissionsTab",
} as const;

export const ACTIONS_TOUR_STEP_IDS = {
  intro: "actionsIntro",
  savings: "actionsSavings",
  category: "actionsCategory",
  buttons: "actionsButtons",
  tabs: "actionsTabs",
  completeProfile: "actionsCompleteProfile",
} as const;

/** Tab of the available actions, where the whole tour runs. */
export const ACTIONS_TOUR_SCREEN = "notStartedActions";

const screens = [ACTIONS_TOUR_SCREEN];

/**
 * Ordered steps. The card steps are dropped while no action is available, the
 * last one once the profile is complete.
 */
export const ACTIONS_TOUR_STEPS: TourStep[] = [
  {
    id: ACTIONS_TOUR_STEP_IDS.intro,
    screens,
    i18nKey: "intro",
  },
  {
    id: ACTIONS_TOUR_STEP_IDS.savings,
    screens,
    target: ACTIONS_TOUR_TARGETS.savings,
    i18nKey: "savings",
  },
  {
    id: ACTIONS_TOUR_STEP_IDS.category,
    screens,
    target: ACTIONS_TOUR_TARGETS.category,
    i18nKey: "category",
  },
  {
    id: ACTIONS_TOUR_STEP_IDS.buttons,
    screens,
    target: ACTIONS_TOUR_TARGETS.buttons,
    i18nKey: "buttons",
  },
  {
    id: ACTIONS_TOUR_STEP_IDS.tabs,
    screens,
    target: ACTIONS_TOUR_TARGETS.tabs,
    i18nKey: "tabs",
  },
  {
    id: ACTIONS_TOUR_STEP_IDS.completeProfile,
    screens,
    target: ACTIONS_TOUR_TARGETS.emissionsTab,
    i18nKey: "completeProfile",
    placement: "top",
  },
];
