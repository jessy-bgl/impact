import { initFakeRepositories } from "@common/context/UsecasesContext";
import { CURRENT_PRIVACY_POLICY_VERSION } from "@consent/domain/entities/Consent";
import { createGrantAnalyticsConsent } from "@consent/domain/usecases/grantAnalyticsConsent";
import { createRevokeAnalyticsConsent } from "@consent/domain/usecases/revokeAnalyticsConsent";

describe("revokeAnalyticsConsent", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let grantAnalyticsConsent: () => void;
  let revokeAnalyticsConsent: () => void;

  beforeEach(() => {
    repositories = initFakeRepositories();
    ({ grantAnalyticsConsent } = createGrantAnalyticsConsent(
      repositories.consentRepository,
    ));
    ({ revokeAnalyticsConsent } = createRevokeAnalyticsConsent(
      repositories.consentRepository,
    ));
  });

  it("should set the consent state to denied", () => {
    revokeAnalyticsConsent();

    expect(repositories.consentRepository.getAnalyticsConsent().state).toBe(
      "denied",
    );
  });

  it("should record the current policy version and a decision timestamp", () => {
    revokeAnalyticsConsent();

    const consent = repositories.consentRepository.getAnalyticsConsent();
    expect(consent.policyVersion).toBe(CURRENT_PRIVACY_POLICY_VERSION);
    expect(consent.decidedAt).not.toBeNull();
  });

  describe("when consent was previously granted", () => {
    it("should switch the state back to denied", () => {
      grantAnalyticsConsent();

      revokeAnalyticsConsent();

      expect(repositories.consentRepository.getAnalyticsConsent().state).toBe(
        "denied",
      );
    });
  });
});
