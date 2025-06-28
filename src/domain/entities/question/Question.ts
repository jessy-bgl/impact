import { Profile } from "@domain/entities/profile/Profile";

export abstract class Question {
  type!:
    | "number"
    | "select"
    | "select-boolean"
    | "multi-select"
    | "multi-number";
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
  options?: Option[];
  subQuestions?: Question[];
}

export type Option = {
  label: string;
  value: string;
};
