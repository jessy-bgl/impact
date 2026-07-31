import { posthog } from "@common/config/posthog";
import { CURRENT_PRIVACY_POLICY_VERSION } from "@consent/domain/entities/Consent";
import { ConsentRepository } from "@consent/domain/repositories/consent.repository";

export const createGrantAnalyticsConsent = (repository: ConsentRepository) => {
  const grantAnalyticsConsent = () => {
    repository.setAnalyticsConsent("granted", CURRENT_PRIVACY_POLICY_VERSION);
    posthog.optIn();
  };

  return { grantAnalyticsConsent };
};
