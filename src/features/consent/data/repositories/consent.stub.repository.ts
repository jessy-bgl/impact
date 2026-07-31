import {
  AnalyticsConsent,
  ConsentState,
} from "@consent/domain/entities/Consent";
import { ConsentRepository } from "@consent/domain/repositories/consent.repository";

export class ConsentStubRepository implements ConsentRepository {
  analyticsConsent: AnalyticsConsent = {
    state: "unset",
    decidedAt: null,
    policyVersion: null,
  };

  getAnalyticsConsent(): AnalyticsConsent {
    return this.analyticsConsent;
  }

  setAnalyticsConsent(state: ConsentState, policyVersion: string): void {
    this.analyticsConsent = {
      state,
      decidedAt: new Date().toISOString(),
      policyVersion,
    };
  }
}
