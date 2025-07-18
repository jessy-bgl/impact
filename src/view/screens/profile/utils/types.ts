import { Profile } from "@domain/entities/profile/Profile";

export type InfoModalState = {
  show: boolean;
  content?: string;
};

export type FormValues = Record<keyof Profile, string>;
