import { AnalyticsProperties } from "@consent/domain/entities/Analytics";

export interface AnalyticsRepository {
  capture(event: string, properties: AnalyticsProperties): void;
  optIn(): void;
  optOut(): void;
  /** Discards the stored identifier: the next opt-in starts a fresh profile. */
  reset(): void;
}
