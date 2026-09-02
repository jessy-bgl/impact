/**
 * Injected so that date-dependent business rules stay testable. The footprints
 * history keys its entries by calendar day, so "same day or not" drives whether
 * a snapshot is upserted or appended — a rule that cannot be exercised against
 * a hardcoded `new Date()`.
 */
export interface Clock {
  now(): Date;
}
