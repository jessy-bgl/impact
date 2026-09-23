import { useContext } from "react";

import { createGuidedTourContext } from "@common/tour/GuidedTourContext";

export const ProfileTourContext = createGuidedTourContext();

export const useProfileTour = () => useContext(ProfileTourContext);
