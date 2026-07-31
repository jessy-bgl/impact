export type ConsentState = "granted" | "denied" | "unset";

export type AnalyticsConsent = {
  state: ConsentState;
  decidedAt: string | null;
  policyVersion: string | null;
};

// Matches the "effective as of" date in docs/privacy-policy/privacy_policy.md.
// Bump this when the policy text changes in a way that should re-prompt consent.
export const CURRENT_PRIVACY_POLICY_VERSION = "2026-07-27";
