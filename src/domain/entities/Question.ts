import { Profile } from "@domain/entities/profile/Profile";

export type Question = {
  label: keyof Profile;
  title: string;
  description?: string;
  note?: string;
  warning?: string;
  defaultValue?: string;
  minValue?: number;
};
