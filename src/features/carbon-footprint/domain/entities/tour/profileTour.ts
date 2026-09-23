import { TourStep } from "@common/tour/types";

/** Namespaced root key holding every step's `title` and `body`. */
export const PROFILE_TOUR_I18N_PREFIX = "intro:profile.tour";

export const PROFILE_TOUR_TARGETS = {
  categoryCard: "profile.categoryCard",
  sectionHeader: "profile.sectionHeader",
  infoIcon: "profile.infoIcon",
  defaultValue: "profile.defaultValue",
  validateButton: "profile.validateButton",
} as const;

export const PROFILE_TOUR_STEP_IDS = {
  categoryCard: "categoryCard",
  openCategory: "openCategory",
  sectionHeader: "sectionHeader",
  defaultValue: "defaultValue",
  infoIcon: "infoIcon",
  validateButton: "validateButton",
} as const;

export const PROFILE_TOUR_HUB_SCREEN = "Profile";

/**
 * Screens holding the questionnaire the tour walks through. Societal services
 * is left out: it only shows a fixed breakdown, with none of the tour targets.
 */
export const PROFILE_TOUR_CATEGORY_SCREENS = [
  "TransportProfile",
  "FoodProfile",
  "HousingProfile",
  "EverydayThingsProfile",
];

const hub = [PROFILE_TOUR_HUB_SCREEN];
const categories = PROFILE_TOUR_CATEGORY_SCREENS;

/**
 * Ordered steps. Phases are emergent, not modelled: the hub steps run on the
 * Profile screen, the rest on whichever category the user opens first.
 *
 * Kept short on purpose, and hands-on: the user opens a category and a
 * sub-category themselves rather than reading about it.
 */
export const PROFILE_TOUR_STEPS: TourStep[] = [
  {
    id: PROFILE_TOUR_STEP_IDS.categoryCard,
    screens: hub,
    target: PROFILE_TOUR_TARGETS.categoryCard,
    i18nKey: PROFILE_TOUR_STEP_IDS.categoryCard,
  },
  {
    id: PROFILE_TOUR_STEP_IDS.openCategory,
    screens: hub,
    target: PROFILE_TOUR_TARGETS.categoryCard,
    i18nKey: PROFILE_TOUR_STEP_IDS.openCategory,
    // The user advances by tapping the real card through the spotlight hole.
    advance: "screenChange",
  },
  {
    id: PROFILE_TOUR_STEP_IDS.sectionHeader,
    screens: categories,
    target: PROFILE_TOUR_TARGETS.sectionHeader,
    i18nKey: PROFILE_TOUR_STEP_IDS.sectionHeader,
    // The user advances by expanding the real section.
    advance: "action",
  },
  {
    id: PROFILE_TOUR_STEP_IDS.defaultValue,
    screens: categories,
    target: PROFILE_TOUR_TARGETS.defaultValue,
    i18nKey: PROFILE_TOUR_STEP_IDS.defaultValue,
    // Nothing is pre-filled once every answer of the section has been edited.
    optional: true,
  },
  {
    id: PROFILE_TOUR_STEP_IDS.infoIcon,
    screens: categories,
    target: PROFILE_TOUR_TARGETS.infoIcon,
    i18nKey: PROFILE_TOUR_STEP_IDS.infoIcon,
    // Some sections have no question with a description.
    optional: true,
  },
  {
    id: PROFILE_TOUR_STEP_IDS.validateButton,
    screens: categories,
    target: PROFILE_TOUR_TARGETS.validateButton,
    i18nKey: PROFILE_TOUR_STEP_IDS.validateButton,
    placement: "top",
  },
];
