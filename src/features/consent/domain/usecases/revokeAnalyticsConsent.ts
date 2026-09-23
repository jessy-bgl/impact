import { CURRENT_PRIVACY_POLICY_VERSION } from "@consent/domain/entities/Consent";
import { AnalyticsRepository } from "@consent/domain/repositories/analytics.repository";
import { ConsentRepository } from "@consent/domain/repositories/consent.repository";

export const createRevokeAnalyticsConsent = (
  consentRepository: ConsentRepository,
  analyticsRepository: AnalyticsRepository,
) => {
  const revokeAnalyticsConsent = () => {
    consentRepository.setAnalyticsConsent(
      "denied",
      CURRENT_PRIVACY_POLICY_VERSION,
    );
    analyticsRepository.optOut();
    // Discards the stored distinct_id so re-granting later mints a fresh
    // identifier rather than resuming the previous profile.
    analyticsRepository.reset();
  };

  return { revokeAnalyticsConsent };
};
