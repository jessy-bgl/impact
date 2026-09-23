import { initFakeRepositories } from "@common/context/UsecasesContext";
import { AnalyticsStubRepository } from "@consent/data/repositories/analytics.stub.repository";
import { CURRENT_PRIVACY_POLICY_VERSION } from "@consent/domain/entities/Consent";
import { createCaptureAnalyticsEvent } from "@consent/domain/usecases/captureAnalyticsEvent";

describe("captureAnalyticsEvent", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let analyticsRepository: AnalyticsStubRepository;
  let captureAnalyticsEvent: ReturnType<
    typeof createCaptureAnalyticsEvent
  >["captureAnalyticsEvent"];

  beforeEach(() => {
    repositories = initFakeRepositories();
    analyticsRepository = repositories.analyticsRepository;
    ({ captureAnalyticsEvent } = createCaptureAnalyticsEvent(
      repositories.consentRepository,
      analyticsRepository,
    ));
  });

  it("should send the event when consent is granted", () => {
    repositories.consentRepository.setAnalyticsConsent(
      "granted",
      CURRENT_PRIVACY_POLICY_VERSION,
    );

    captureAnalyticsEvent("tour_started", { trigger: "auto" });

    expect(analyticsRepository.events).toEqual([
      { event: "tour_started", properties: { trigger: "auto" } },
    ]);
  });

  it("should send nothing before the user has chosen", () => {
    captureAnalyticsEvent("tour_started", { trigger: "auto" });

    expect(analyticsRepository.events).toEqual([]);
  });

  it("should send nothing when consent is denied", () => {
    repositories.consentRepository.setAnalyticsConsent(
      "denied",
      CURRENT_PRIVACY_POLICY_VERSION,
    );

    captureAnalyticsEvent("tour_started", { trigger: "auto" });

    expect(analyticsRepository.events).toEqual([]);
  });
});
