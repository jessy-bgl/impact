import { createContext } from "react";

import { TourStartOptions } from "@common/tour/TourContext";

export type TourTrigger = "auto" | "help_icon";

export type GuidedTourContextValue = {
  /**
   * Pass `options.screen` when the tour starts right after a navigation: the
   * screen on display is not updated yet.
   */
  startTour: (trigger: TourTrigger, options?: TourStartOptions) => void;
  isRunning: boolean;
};

/**
 * One context per feature tour: tours nest, so a shared context would only
 * ever reach the nearest one.
 */
export const createGuidedTourContext = () =>
  createContext<GuidedTourContextValue>({
    startTour: () => {},
    isRunning: false,
  });
