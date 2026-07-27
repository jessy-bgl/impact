import Constants from "expo-constants";
import PostHog from "posthog-react-native";
import { Platform } from "react-native";

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
  errorTracking: {
    autocapture: {
      uncaughtExceptions: true,
      unhandledRejections: true,
    },
  },
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

// On web, the SDK's uncaught-exception autocapture hooks ErrorUtils, which
// react-native-web never wires up to window.onerror. Bridge it manually so
// synchronous errors are reported. Unhandled rejections are already covered.
if (Platform.OS === "web" && typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    // Resource load failures (<img>, <script>) surface here without an error
    if (!event.error) return;

    posthog.captureException(
      event.error,
      {},
      { mechanism: { type: "onuncaughtexception", handled: false } },
    );
  });
}
