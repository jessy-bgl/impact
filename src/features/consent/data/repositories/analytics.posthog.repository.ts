import { posthog } from "@common/config/posthog";
import { AnalyticsProperties } from "@consent/domain/entities/Analytics";
import { AnalyticsRepository } from "@consent/domain/repositories/analytics.repository";

export class AnalyticsPostHogRepository implements AnalyticsRepository {
  capture(event: string, properties: AnalyticsProperties): void {
    posthog.capture(event, properties);
  }

  optIn(): void {
    posthog.optIn();
  }

  optOut(): void {
    posthog.optOut();
  }

  reset(): void {
    posthog.reset();
  }
}
