import { FootprintCategory } from "@domain/entities/categories/Categories";

export type ActionState = "notStarted" | "completed" | "inProgress" | "skipped";

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

  restore({
    savedFootprint,
    state,
  }: {
    savedFootprint: number;
    state: ActionState;
  }): void {
    this.state = state;
    this.savedFootprint = savedFootprint;
  }

  protected abstract isCompleted(category: unknown): boolean;

  abstract computeSavedFootprint(category: unknown): void;
}
