import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";

export abstract class Question {
  type!:
    "number" | "select" | "select-boolean" | "multi-select" | "multi-number";
  label!: keyof Profile;
  title!: string;
  description?: string;
  note?: string;
  warning?: string;
  isApplicable!: boolean;
  isInactive!: boolean;
  defaultValue?: string;
  isEngineDefaultValueUsed?: boolean;
  minValue?: number;
  maxValue?: number;
  unit?: string;
  options?: Option[];
  subQuestions?: Question[];

  /**
   * True when a screen would render both questions the same way: same rule,
   * and the same situation-dependent state (what its rule defines never
   * changes for a given label).
   */
  hasSameState(other: Question): boolean {
    const subQuestions = this.subQuestions ?? [];
    const otherSubQuestions = other.subQuestions ?? [];
    return (
      this.label === other.label &&
      this.isApplicable === other.isApplicable &&
      this.defaultValue === other.defaultValue &&
      this.isEngineDefaultValueUsed === other.isEngineDefaultValueUsed &&
      subQuestions.length === otherSubQuestions.length &&
      subQuestions.every((subQuestion, index) =>
        subQuestion.hasSameState(otherSubQuestions[index]),
      )
    );
  }
}

export type Option = {
  label: string;
  value: string;
};
