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
  description: string;
  category: ActionCategory;
  state: ActionState;
  savedFootprint: number;

  constructor({
    id,
    label,
    description,
    category,
    state = "notStarted",
    savedFootprint = 0,
  }: {
    id: string;
    label: string;
    description: string;
    category: ActionCategory;
    state?: ActionState;
    savedFootprint?: number;
  }) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.category = category;
    this.state = state;
    this.savedFootprint = savedFootprint;
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
