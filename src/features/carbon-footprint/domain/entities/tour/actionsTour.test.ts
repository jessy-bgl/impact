import {
  ACTIONS_TOUR_SCREEN,
  ACTIONS_TOUR_STEPS,
  ACTIONS_TOUR_STEP_IDS,
  ACTIONS_TOUR_TARGETS,
} from "@carbonFootprint/domain/entities/tour/actionsTour";
import { PROFILE_TOUR_STEPS } from "@carbonFootprint/domain/entities/tour/profileTour";
import intro from "@common/translations/fr/intro.json";

const tourTranslations = intro.actions.tour as unknown as Record<
  string,
  { title?: string; body?: string }
>;

describe("ACTIONS_TOUR_STEPS", () => {
  it("has unique, declared step ids", () => {
    const ids = ACTIONS_TOUR_STEPS.map((step) => step.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(
      Object.values(ACTIONS_TOUR_STEP_IDS).sort(),
    );
  });

  it("shares no step id with the profile tour, which it nests with", () => {
    const profileIds = PROFILE_TOUR_STEPS.map((step) => step.id);

    ACTIONS_TOUR_STEPS.forEach(({ id }) =>
      expect(profileIds).not.toContain(id),
    );
  });

  it("translates every step", () => {
    ACTIONS_TOUR_STEPS.forEach(({ i18nKey }) => {
      expect(tourTranslations[i18nKey]?.title).toBeTruthy();
      expect(tourTranslations[i18nKey]?.body).toBeTruthy();
    });
  });

  it("only spotlights declared targets", () => {
    ACTIONS_TOUR_STEPS.forEach(({ target }) => {
      if (target) expect(Object.values(ACTIONS_TOUR_TARGETS)).toContain(target);
    });
  });

  it("runs on the available actions tab", () => {
    ACTIONS_TOUR_STEPS.forEach(({ screens }) =>
      expect(screens).toEqual([ACTIONS_TOUR_SCREEN]),
    );
  });

  it("opens with a step that needs no action to be loaded", () => {
    const [firstStep] = ACTIONS_TOUR_STEPS;

    expect(firstStep.target).toBeUndefined();
  });

  it("is only moved through from the tooltip", () => {
    ACTIONS_TOUR_STEPS.forEach(({ advance }) =>
      expect(advance ?? "button").toBe("button"),
    );
  });

  it("ends on the invitation to complete the profile", () => {
    expect(ACTIONS_TOUR_STEPS.at(-1)?.id).toBe(
      ACTIONS_TOUR_STEP_IDS.completeProfile,
    );
  });
});
