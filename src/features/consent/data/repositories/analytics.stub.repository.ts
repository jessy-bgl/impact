import { AnalyticsProperties } from "@consent/domain/entities/Analytics";
import { AnalyticsRepository } from "@consent/domain/repositories/analytics.repository";

export class AnalyticsStubRepository implements AnalyticsRepository {
  events: { event: string; properties: AnalyticsProperties }[] = [];
  isOptedIn = false;
  resetCount = 0;

  capture(event: string, properties: AnalyticsProperties): void {
    this.events.push({ event, properties });
  }

  optIn(): void {
    this.isOptedIn = true;
  }

  optOut(): void {
    this.isOptedIn = false;
  }

  reset(): void {
    this.resetCount += 1;
  }
}
