import { AnalyticsProperties } from "@consent/domain/entities/Analytics";
import { AnalyticsRepository } from "@consent/domain/repositories/analytics.repository";
import { ConsentRepository } from "@consent/domain/repositories/consent.repository";

export const createCaptureAnalyticsEvent = (
  consentRepository: ConsentRepository,
  analyticsRepository: AnalyticsRepository,
) => {
  // Consent is read on every call, so a choice made mid-session applies at once.
  const captureAnalyticsEvent = (
    event: string,
    properties: AnalyticsProperties,
  ) => {
    if (consentRepository.getAnalyticsConsent().state !== "granted") return;
    analyticsRepository.capture(event, properties);
  };

  return { captureAnalyticsEvent };
};
