import { posthog } from "@common/config/posthog";
import { CURRENT_PRIVACY_POLICY_VERSION } from "@consent/domain/entities/Consent";
import { ConsentRepository } from "@consent/domain/repositories/consent.repository";

export const createRevokeAnalyticsConsent = (repository: ConsentRepository) => {
  const revokeAnalyticsConsent = () => {
    repository.setAnalyticsConsent("denied", CURRENT_PRIVACY_POLICY_VERSION);
    posthog.optOut();
    // Discards the stored distinct_id so re-granting later mints a fresh
    // identifier rather than resuming the previous profile.
    posthog.reset();
  };

  return { revokeAnalyticsConsent };
};
