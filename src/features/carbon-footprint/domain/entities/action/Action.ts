import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/Footprints";

export type ActionState = "notStarted" | "inProgress" | "skipped";

export const actionStates: ActionState[] = [
  "notStarted",
  "inProgress",
  "skipped",
];

export type ActionCategory = FootprintCategory;

export abstract class Action {
  id: string;
  label: string;
  category: ActionCategory;
  state: ActionState;
  savedFootprint: number;
  /** Id the action was stored under before the model renamed it in v4.14.4. */
  legacyId?: string;

  constructor({
    id,
    label,
    category,
    state = "notStarted",
    savedFootprint = 0,
    legacyId,
  }: {
    id: string;
    label: string;
    category: ActionCategory;
    state?: ActionState;
    savedFootprint?: number;
    legacyId?: string;
  }) {
    this.id = id;
    this.label = label;
    this.category = category;
    this.state = state;
    this.savedFootprint = savedFootprint;
    this.legacyId = legacyId;
  }

  isStoredAs(storedAction: Action): boolean {
    return (
      storedAction.id === this.id ||
      (this.legacyId !== undefined && storedAction.id === this.legacyId)
    );
  }

  restoreState(action: Action): void {
    this.state = action.state;
  }
}

/**
 * Whether the engine could tell how much the action saves: when it cannot,
 * the saving is left at zero.
 */
export const hasKnownSavings = (action: Action): boolean =>
  action.savedFootprint > 0;
