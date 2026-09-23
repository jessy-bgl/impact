import {
  PROFILE_TOUR_CATEGORY_SCREENS,
  PROFILE_TOUR_HUB_SCREEN,
  PROFILE_TOUR_STEPS,
  PROFILE_TOUR_STEP_IDS,
  PROFILE_TOUR_TARGETS,
} from "@carbonFootprint/domain/entities/tour/profileTour";
import intro from "@common/translations/fr/intro.json";

const tourTranslations = intro.profile.tour as unknown as Record<
  string,
  { title?: string; body?: string }
>;

describe("PROFILE_TOUR_STEPS", () => {
  it("has unique, declared step ids", () => {
    const ids = PROFILE_TOUR_STEPS.map((step) => step.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(
      expect.arrayContaining(Object.values(PROFILE_TOUR_STEP_IDS)),
    );
    ids.forEach((id) =>
      expect(Object.values(PROFILE_TOUR_STEP_IDS)).toContain(id),
    );
  });

  it("translates every step", () => {
    PROFILE_TOUR_STEPS.forEach(({ i18nKey }) => {
      expect(tourTranslations[i18nKey]?.title).toBeTruthy();
      expect(tourTranslations[i18nKey]?.body).toBeTruthy();
    });
  });

  it("translates every navigation label", () => {
    Object.values(intro.tour.nav).forEach((label) =>
      expect(label).toBeTruthy(),
    );
  });

  it("only spotlights declared targets", () => {
    PROFILE_TOUR_STEPS.forEach(({ target }) => {
      if (target) expect(Object.values(PROFILE_TOUR_TARGETS)).toContain(target);
    });
  });

  it("only runs on the profile hub and the category screens", () => {
    const knownScreens = [
      PROFILE_TOUR_HUB_SCREEN,
      ...PROFILE_TOUR_CATEGORY_SCREENS,
    ];

    PROFILE_TOUR_STEPS.forEach(({ screens }) => {
      expect(screens.length).toBeGreaterThan(0);
      screens.forEach((screen) => expect(knownScreens).toContain(screen));
    });
  });

  it("runs every hub step before every category step", () => {
    const isHubStep = (index: number) =>
      PROFILE_TOUR_STEPS[index].screens.includes(PROFILE_TOUR_HUB_SCREEN);

    const lastHubIndex = PROFILE_TOUR_STEPS.map((_, index) => index)
      .filter(isHubStep)
      .pop();
    const firstCategoryIndex = PROFILE_TOUR_STEPS.findIndex((step) =>
      step.screens.includes(PROFILE_TOUR_CATEGORY_SCREENS[0]),
    );

    expect(lastHubIndex).toBeLessThan(firstCategoryIndex);
  });

  it("hands over to the category screens on the last hub step", () => {
    const handoverStep = PROFILE_TOUR_STEPS.filter((step) =>
      step.screens.includes(PROFILE_TOUR_HUB_SCREEN),
    ).pop();

    expect(handoverStep?.advance).toBe("screenChange");
  });

  it("lets the user open a sub-category themselves on arriving in a category", () => {
    const firstCategoryStep = PROFILE_TOUR_STEPS.find(
      (step) => !step.screens.includes(PROFILE_TOUR_HUB_SCREEN),
    );

    expect(firstCategoryStep?.advance).toBe("action");
  });

  it("makes every category step available on every category screen", () => {
    PROFILE_TOUR_STEPS.filter(
      (step) => !step.screens.includes(PROFILE_TOUR_HUB_SCREEN),
    ).forEach((step) =>
      expect(step.screens).toEqual(PROFILE_TOUR_CATEGORY_SCREENS),
    );
  });
});
