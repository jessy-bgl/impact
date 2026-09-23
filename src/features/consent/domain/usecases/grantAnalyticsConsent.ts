import { CURRENT_PRIVACY_POLICY_VERSION } from "@consent/domain/entities/Consent";
import { AnalyticsRepository } from "@consent/domain/repositories/analytics.repository";
import { ConsentRepository } from "@consent/domain/repositories/consent.repository";

export const createGrantAnalyticsConsent = (
  consentRepository: ConsentRepository,
  analyticsRepository: AnalyticsRepository,
) => {
  const grantAnalyticsConsent = () => {
    consentRepository.setAnalyticsConsent(
      "granted",
      CURRENT_PRIVACY_POLICY_VERSION,
    );
    analyticsRepository.optIn();
  };

  return { grantAnalyticsConsent };
};
