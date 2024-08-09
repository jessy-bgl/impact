import { Profile } from "@domain/entities/profile/Profile";

/* eslint-disable @typescript-eslint/no-unused-vars */
export type InfoModalState = {
  show: boolean;
  content?: string;
};

export type FormValues = Record<keyof Profile, string>;
