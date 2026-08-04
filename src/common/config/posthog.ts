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

// Tests never configure a project token — the client is disabled there anyway,
// so the warning would only be noise in the jest output.
const isTestEnv = process.env.NODE_ENV === "test";

if (__DEV__ && !isTestEnv && !isPostHogConfigured) {
  console.error(
    "POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, " +
      "this causes events to be silently missed. " +
      "This error stops appearing once POSTHOG_PROJECT_TOKEN is configured",
  );
}

// $exception properties can carry a raw error message, which — for the catch
// sites in AdemeEngine.ts/useProfileSync.ts — is now always a static message
// (see those files). This is a backstop for exception sources we don't
// control (native crashes, unhandled promise rejections) that might still
// carry dynamic content.
const MAX_EXCEPTION_MESSAGE_LENGTH = 200;

export const posthog = new PostHog(projectToken || "placeholder_key", {
  host,
  disabled: !isPostHogConfigured,
  // No capture of any kind before the user has made a consent choice — see
  // src/features/consent. Flipped on by posthog.optIn() from
  // grantAnalyticsConsent, off again via optOut() from
  // revokeAnalyticsConsent.
  defaultOptIn: false,
  disableGeoip: true,
  personProfiles: "never",
  enableSessionReplay: false,
  // Off, not just unused: leaving this on fires an automatic capture() call
  // during client init, before consent is known — see
  // docs/gdpr-compliance.md §2.1 for why that matters.
  captureAppLifecycleEvents: false,
  errorTracking: {
    autocapture: {
      uncaughtExceptions: true,
      unhandledRejections: true,
      nativeCrashes: true,
    },
  },
  before_send: (event) => {
    if (!event || event.event !== "$exception") return event;
    const exceptionList = event.properties?.$exception_list;
    if (!Array.isArray(exceptionList)) return event;
    return {
      ...event,
      properties: {
        ...event.properties,
        $exception_list: exceptionList.map((exception) => {
          if (typeof exception !== "object" || exception === null)
            return exception;
          const value = (exception as { value?: unknown }).value;
          if (
            typeof value !== "string" ||
            value.length <= MAX_EXCEPTION_MESSAGE_LENGTH
          )
            return exception;
          return {
            ...exception,
            value: `${value.slice(0, MAX_EXCEPTION_MESSAGE_LENGTH)}…`,
          };
        }),
      },
    };
  },
  flushAt: 20,
  flushInterval: 10000,
  maxBatchSize: 100,
  maxQueueSize: 1000,
  // Unused — no feature flags exist in this app — and preloading one also
  // triggers a network request at init, before consent is known.
  preloadFeatureFlags: false,
  sendFeatureFlagEvent: false,
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
