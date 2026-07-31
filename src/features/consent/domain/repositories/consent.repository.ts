import {
  AnalyticsConsent,
  ConsentState,
} from "@consent/domain/entities/Consent";

export interface ConsentRepository {
  getAnalyticsConsent(): AnalyticsConsent;
  setAnalyticsConsent(state: ConsentState, policyVersion: string): void;
}
