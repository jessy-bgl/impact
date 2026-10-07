import type { PostHogOptions } from "posthog-react-native";

type BeforeSendFn = Extract<
  NonNullable<PostHogOptions["before_send"]>,
  (...args: never[]) => unknown
>;
type CaptureEvent = NonNullable<Parameters<BeforeSendFn>[0]>;

// $exception properties can carry a raw error message, which — for the catch
// sites in AdemeEngine.ts/useProfileSync.ts — is now always a static message
// (see those files). This is a backstop for exception sources we don't
// control (native crashes, unhandled promise rejections) that might still
// carry dynamic content.
export const MAX_EXCEPTION_MESSAGE_LENGTH = 200;

export type AnalyticsEnvironment = "development" | "production";

export const createBeforeSend =
  (environment: AnalyticsEnvironment): BeforeSendFn =>
  (event) => {
    if (!event) return event;
    return tagEnvironment(truncateExceptionMessages(event), environment);
  };

// Lets PostHog's test account filter exclude dev builds.
const tagEnvironment = (
  event: CaptureEvent,
  environment: AnalyticsEnvironment,
): CaptureEvent => ({
  ...event,
  properties: { ...event.properties, environment },
});

const truncateExceptionMessages = (event: CaptureEvent): CaptureEvent => {
  const exceptionList = event.properties?.$exception_list;
  if (event.event !== "$exception" || !Array.isArray(exceptionList))
    return event;
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
};
