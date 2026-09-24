import { Clock } from "@common/domain/Clock";

export class ClockStub implements Clock {
  current = new Date("2026-03-12T10:00:00");

  now(): Date {
    return this.current;
  }
}
