import { Clock } from "@common/domain/Clock";

export class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
}
