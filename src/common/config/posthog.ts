import Constants from "expo-constants";
import PostHog from "posthog-react-native";

const projectToken = Constants.expoConfig?.extra?.posthogProjectToken as
  string | undefined;
const host =
  (Constants.expoConfig?.extra?.posthogHost as string | undefined) ||
  "https://eu.i.posthog.com";

const isPostHogConfigured =
  !!projectToken && projectToken !== "phc_your_project_token_here";

if (__DEV__ && !isPostHogConfigured) {
  console.error(
    "POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, " +
      "this causes events to be silently missed. " +
      "This error stops appearing once POSTHOG_PROJECT_TOKEN is configured",
  );
}

export const posthog = new PostHog(projectToken || "placeholder_key", {
  host,
  disabled: !isPostHogConfigured,
  captureAppLifecycleEvents: true,
  flushAt: 20,
  flushInterval: 10000,
  maxBatchSize: 100,
  maxQueueSize: 1000,
  preloadFeatureFlags: true,
  sendFeatureFlagEvent: true,
  featureFlagsRequestTimeoutMs: 10000,
  requestTimeout: 10000,
  fetchRetryCount: 3,
  fetchRetryDelay: 3000,
});
