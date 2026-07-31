import { useAppStore } from "@common/store/useStore";
import {
  AnalyticsConsent,
  ConsentState,
} from "@consent/domain/entities/Consent";
import { ConsentRepository } from "@consent/domain/repositories/consent.repository";

export class ConsentStoreRepository implements ConsentRepository {
  constructor(private store: typeof useAppStore) {}

  getAnalyticsConsent(): AnalyticsConsent {
    return this.store.getState().analyticsConsent;
  }

  setAnalyticsConsent(state: ConsentState, policyVersion: string): void {
    this.store.setState((s) => ({
      ...s,
      analyticsConsent: {
        state,
        decidedAt: new Date().toISOString(),
        policyVersion,
      },
    }));
  }
}
