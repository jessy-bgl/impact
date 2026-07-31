import { initFakeRepositories } from "@common/context/UsecasesContext";
import { CURRENT_PRIVACY_POLICY_VERSION } from "@consent/domain/entities/Consent";
import { createGrantAnalyticsConsent } from "@consent/domain/usecases/grantAnalyticsConsent";

describe("grantAnalyticsConsent", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let grantAnalyticsConsent: () => void;

  beforeEach(() => {
    repositories = initFakeRepositories();
    ({ grantAnalyticsConsent } = createGrantAnalyticsConsent(
      repositories.consentRepository,
    ));
  });

  it("should set the consent state to granted", () => {
    grantAnalyticsConsent();

    expect(repositories.consentRepository.getAnalyticsConsent().state).toBe(
      "granted",
    );
  });

  it("should record the current policy version and a decision timestamp", () => {
    grantAnalyticsConsent();

    const consent = repositories.consentRepository.getAnalyticsConsent();
    expect(consent.policyVersion).toBe(CURRENT_PRIVACY_POLICY_VERSION);
    expect(consent.decidedAt).not.toBeNull();
  });
});
